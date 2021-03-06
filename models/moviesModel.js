const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const movieSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true,
      minlength:2,
      maxlength:100
    },
    movieCode:{
      type:String,
      required:true,
      minlength:2,
      maxlength:100
    },
    info:{
      type:String,
      minlength:0,
      maxlength:500
    },
    category:{
      type:String,
      required:true,
      minlength:2,
      maxlength:500
    },
    likes:{
      type:Array,
      default:[]
    },
    userId:{
      type:String,
      required:true
    }
  })
  
  const movieModel = mongoose.model("movies", movieSchema);
  
  exports.movieModel = movieModel; 

   const validMovie = (_mov) =>{
       let schema = Joi.object({
           id:Joi.any(),
           title:Joi.string().min(2).max(50).required(),
           movieCode:Joi.string().min(2).max(50).required(),
           info: Joi.string().min(2).max(500).required(),
           category:Joi.string().min(1).max(50).required(),
           likes:Joi.array()
         })
         return schema.validate(_mov);
       }
       
       exports.validMovie = validMovie;
