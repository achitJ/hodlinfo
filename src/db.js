const mongoose = require('mongoose');

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
        
        return error;
    } 
})();