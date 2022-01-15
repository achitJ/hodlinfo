const express = require('express');
const logger = require('../logger');
const router = new express.Router();
const Ticker = require('../models/tickers');

router.get('/', async (req, res, next) => {

    try {

        const tickers = await Ticker.find();

        logger.http("Tickers fetched");

        res.status(200).send(tickers);
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