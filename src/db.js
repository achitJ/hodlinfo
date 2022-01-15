const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.set('bufferCommands', false);

(async () => { 

    try {

        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Connected to MongoDB");
    }
    catch(error) {

        logger.error(error);
        
        return error;
    } 
})();