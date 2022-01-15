require('dotenv').config({ path: './config/config.env' })

const express = require('express');
const app = express();

require('./db');

const errorHandler = require('./middleware/errorHandler');
const logger = require('./logger');

const updateDB = require('./router/updateDB');
const getData = require('./router/getData');

const port = process.env.PORT || 5000;  

app.use(express.json());

app.get('/', (req, res) => {

    logger.info("Hello World");
    res.send("Hello World");
});


app.use('/api/v1/', updateDB);
app.use('/api/v1/', getData);

app.use(errorHandler);

(async () => {
    app.listen(port, (error) => {

        if(error) {

            logger.error(error);
        }

        console.log(`Server chal gaya ${port} pe!`);
    });
})()