const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const pendingAmountHistorySchema = new mongoose.Schema({

customerId:{
type:ObjectId,
ref:"Customer Details"
},

jma:{
    type:Number
},

baaki:{
    type:String
},

date:{
    day:{
        type:String
    },
    month:{
        type:String
    },
    year:{
        type:String
    }
},

shortDescription:{
    type:String
},

attachment:{
    url: {
        type: String,
      },
      public_Id: {
        type: String,
      }
}

}, {timestamps:true})


module.exports = mongoose.model("Customer Amount history", pendingAmountHistorySchema)