const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
    State:{
        type:String,
        require:true
    },
    City:{
        type:String,
        require:true
    },
    BG:{
        type:String,
        require:true
    }

})

const Request = new mongoose.model("Request",requestSchema);

module.exports= Request;
