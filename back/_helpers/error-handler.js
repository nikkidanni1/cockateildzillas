module.exports = errorHandler

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ responseBody: null, error: err });
    }

    // default to 500 server error
    return res.status(500).json({ responseBody: null, error: err.message });
}