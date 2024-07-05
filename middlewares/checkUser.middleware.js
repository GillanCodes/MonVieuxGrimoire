let jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

module.exports = async (req, res, next) => {

    let token = req.headers.authorization;
    if (token) {
        jwt.verify(token.split(' ')[1], process.env.JWT_TOKEN, async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await userModel.findById(decodedToken.userId).select("-password");
                res.locals.user = user;
                next();
            }
        })

    } else {
        res.locals.user = null;
        next();
    }
}