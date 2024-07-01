let mongoose = require('mongoose');
let {isEmail} = require('validator');
let bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        maxlength: 1024
    },
    email: {
        type: String,
        required:true,
        validate: [isEmail],
        trim: true,
        unique: true,
        lowercase: true
    }
}, {
    timestamps: true
});


userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(email, password) {

    const user = await this.findOne({email});
    if (user) {
       
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } else {
            throw Error('incorrect password')
        }
    } else {
        throw Error('incorrect username');
    }

}

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;