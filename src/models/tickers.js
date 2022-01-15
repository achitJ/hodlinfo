const mongoose = require('mongoose');

const tickerSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true,
        trim: true,
        unique: true
    },

    last: {

        type: Number,
        required: true,
    },

    buy: {

        type: Number,
        required: true,
    },

    sell: {

        type: Number,
        required: true,
    },

    volume: {

        type: Number,
        required: true,
    },

    base_unit: {

        type: String,
        required: true,
        trim: true
    }
}, {

    timestamps: true
});

tickerSchema.methods.toJSON = function() {

    const obj = this.toObject();

    delete obj._id;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;

    return obj;
};

const Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = Ticker;