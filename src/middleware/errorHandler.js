module.exports = (error, req, res, next) => {

    console.log(error);

    if(error.errorType == 'ValidationError') {

        res.status(400).send({

            error: "Invalid Request",
        });
    }

    else {

        res.status(500).send({

            error: "Internal Server Error"
        });
    }
}