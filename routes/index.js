const express = require('express');
const router = express.Router();


router.get('/',  (req, res) =>{
    res.json('Hello World')
    console.log('work');
  })


module.exports = router;