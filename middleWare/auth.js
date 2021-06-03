const jwt = require('jsonwebtoken');

const authToken = (req,res,next) =>{
    let token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json('token not found')
    }
    try{
      let checkToken = jwt.verify(token, 'secretKey')
      req.email  = checkToken.email;
      req._id = checkToken._id;
      next()  
    } catch(err){
        return res.json(err)
    }
}

exports.authToken = authToken;