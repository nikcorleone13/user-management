const mongoose = require('mongoose');
const validator = require('validator');

const userManagementSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
          }
    },
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    profilePictureURL:{
        type:String,
        required:true,
        validate: { 
            validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
            message: 'Must be a Valid URL' 
          }
    },
    phone:Number,

})

const User_Management = mongoose.model('User_Management',userManagementSchema);
module.exports = User_Management;