let jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

module.exports = async (req, res, next) => {

    let token = req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_TOKEN, async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await userModel.findById(decodedToken.id).select("-password");
                res.locals.user = user;
                next();
            }
        })

    } else {
        res.locals.user = null;
        next();
    }
}