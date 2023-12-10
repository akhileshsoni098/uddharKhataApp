const mongoose  = require("mongoose");

const customerDetailsSchema = new mongoose.Schema({

customerName:{
    type:String,
    required:true
},
 
village:{
    type:String,
    required:true
},

contact:{
    type:String
},

date:{
    day:{
        type:String,
        required:true
    },
    month:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    }
},

totalPendingAmount:{
    type:Number,
    required:true
},

restPendingAmount:{
    type:Number
},

description:{
    type:String
},

attachment:{
    url: {
        type: String,
      },
      public_Id: {
        type: String,
      }
    },

isDeteted:{
    type:Boolean,
    default:false
}

}, {timestamps:true})

module.exports = mongoose.model("Customer Details", customerDetailsSchema)