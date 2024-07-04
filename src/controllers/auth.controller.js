const userModel = require('../../models/user.model');
let jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN);
}

module.exports.register = async(req, res) => {
    const {password, email} = req.body;

    try {
        const user = await userModel.create({email, password});
        res.status(201).json({user:user._id});
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.login = async(req, res) => {
    const {email, password} = req.body;

    try {
        var user = await userModel.login(email, password);

        if (!user) throw new Error("Invalid user");

        const token = createToken(user._id);
        res.status(201).json({userId:user._id, token});

    } catch (error) {
        throw new Error(error);
    }
}