const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    user: String,
    email: String,
    pass: String,
    date_time:{
        type: Date, default: Date.now()
    },
    rule: {
        type: String, default: "user"
    }
});

const userModel = mongoose.model('users', userSchema);

exports.userModel = userModel;

const validUser = (_user) =>{
    let schema = Joi.object({
        id: Joi.any(),
        user: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(50).required(),
        pass: Joi.string().min(2).max(50).required()
    })
    return schema.validate(_user);
}

exports.validUser = validUser;

const validEditUser = (_userObj) => {
    let schema = Joi.object({
      id:Joi.any().required(),
      user:Joi.string().min(2).max(50).required(),
      email: Joi.string().min(2).max(50).email().required()
    })
    return schema.validate(_userObj);
  }

  exports.validEditUser = validEditUser;

const validLogin = (_user) =>{
    let schema = Joi.object({
        email: Joi.string().min(2).max(50).required(),
        pass: Joi.string().min(2).max(50).required()
    })
    return schema.validate(_user);
}

exports.validLogin = validLogin;

const genToken = (_id,_email) =>{
    const token = jwt.sign({_id:_id,email:_email},"secretKey", {expiresIn:'300mins'});
    return token;
}
exports.genToken = genToken;



