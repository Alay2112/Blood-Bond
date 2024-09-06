const mongoose = require("mongoose");
const donorSchema = new mongoose.Schema({
    Name :{
        type:String,
        required:true
     },
    // PhoneNo :{
    //     type:Number,
    //     // required:true,
        
    // },
    Age:{
        type:Number,
        require:true
    },
    BG:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    PinCode :{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    }
})

//create collections

const Donor = new mongoose.model("Donor",donorSchema);

module.exports= Donor;
