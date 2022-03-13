const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  posterId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trimp: true,
  },
 images: {
   data:Buffer,
   contentType: String
    // required : true
  },
  video :{
    type : String
  },
  description: {
    type: String,
    maxlength: 500,
    required : true,
    trimp :true
  },
  adress : {
    type : String,
    trimp: true
  },
  city : {
    type : String,
    required : true,
    trimp: true
  },
  country : {
    type : String,
    required : true,
    trimp : true
  },
  price : {
    type :Number
  },
  telNum : {
    type : Number
  },
  likers : {
    type : [String],
    required : true
  },
  comments : {
    type : [
      {
        commenterId: String,
        commenterPseudo: String,
        text: String,
        timestamp : Number
      }
    ],
    required : true
  }
},
{
  timestamps : true
}
); 

module.exports = mongoose.model('post' , PostSchema)
