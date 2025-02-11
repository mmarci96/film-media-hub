const errorHandler = (
    err, req, res, next
) => {
    if (!err._code) {
        console.error(err);
    }

    res.status(err.status || err._code || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
};

export default errorHandler;
