const express = require('express');
const router = new express.Router();
const logger = require('../logger');
const updateDB = require('../utils/getDB');
const Ticker = require('../models/tickers');

router.patch('/updateDatabase', async (req, res, next) => {

    try {

        const data = await updateDB();
    
        let index = 0;

        for(const key in data) {

            const tickerUpdate = await Ticker.findOne({name: data[key].name});

            if(tickerUpdate) {

                tickerUpdate.last = data[key].last;
                tickerUpdate.buy = data[key].buy;
                tickerUpdate.sell = data[key].sell;
                tickerUpdate.volume = data[key].volume;
                tickerUpdate.base_unit = data[key].base_unit;

                await tickerUpdate.save();
            }
            else {

                const curr = {};

                curr.name = data[key].name;
                curr.last = data[key].last;
                curr.buy = data[key].buy;
                curr.sell = data[key].sell;
                curr.volume = data[key].volume;
                curr.base_unit = data[key].base_unit;

                const ticker = new Ticker(curr);

                await ticker.save();
            }

            if(index === 9) break;
            index++;
        }

        logger.http("Database Updated");
    
        res.status(200).send({ message: `Database updated at {${new Date()}}` });
    } 
    catch(error) {

        logger.error(error);

        let errorMessage = '';
        let errorType = '';

        if(error.name === 'MongoError') {
        
            errorMessage = `Database already updated at {${new Date()}}`;
            errorType = 'MongoError';
        } 
        else if(error.name === 'ValidationError') {

            errorMessage = `Validation Error: ${error.message}`;
            errorType = 'ValidationError';
        }
        else {

            errorType = 'Internal Error'
        }

        const errorObject = {
            error: errorType,
            message: errorMessage
        };

        next(errorObject);
    }

});

module.exports = router;