const winston = require('winston');
const format = winston.format;
const path = require('path');

const levels = {

    error: 0,
    warn: 1,
    http: 3,
    info: 2,
    verbose: 4,
    debug: 5,
    silly: 6
};

const newFormat = format.printf(({ level, message, timestamp }) => {

    return `${timestamp} => ${level}: ${message}`;
});

const logger = winston.createLogger({

    levels: levels,
    format: format.combine(
        format.timestamp(),
        newFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(__dirname, '../logs/combined.log') }),
        new winston.transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'warn' }),
        new winston.transports.File({ filename: path.join(__dirname, '../logs/http.log'), level: 'http' })
    ]
});

module.exports = logger;