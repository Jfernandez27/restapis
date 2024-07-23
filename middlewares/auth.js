const jwt = require('jsonwebtoken');

module.exports = (req, res, cb) => {
    // Header Auth
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('Not authenticated, no JWT exists');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let checkToken;
    try {
        checkToken = jwt.verify(token, 'SECRET');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    if (!checkToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }

    next();
};
