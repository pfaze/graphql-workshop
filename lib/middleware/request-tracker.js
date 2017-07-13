const uuid = require('node-uuid');

module.exports = (req, res, next) => {
    req.id = uuid.v4();
    next();
};
