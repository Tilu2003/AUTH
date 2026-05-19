import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  isBlocked : {
    type : Boolean,
    required : true,
    default : false
  },
  postal_code: {
    type : Number,
    required : true,  
  },
  Name : {
    type : String,
    required : true
  },
  address : {
    type : String,
    required : true
  },
  phone : {
    type : String,
    required : true
  },
});

const User= mongoose.model("User",userSchema);

export default User;