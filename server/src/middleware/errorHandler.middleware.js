const errorHandler = (error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        statusCode: error.statusCode,
        success: false,
        timestamp: new Date().toISOString(),
        error: error.name,
        message: error.message,
        ...error,
        errors: error?.errors,
        stack: error.stack,
    });
};

module.exports = errorHandler;
