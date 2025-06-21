import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    type : {
        type : String,
        enum : ['deposit', 'transfer', 'withdraw'],
        required : true
    },
    amount : {
        type: Number,
        required: true
    },
    from : {
        type : String // customer id or null in case of deposit
    }, 
    to : {
        type : String // customer id or null in case of withdrawl
    },
    status : {
        type : String,
        enum : ["success", "failed"],
        default : "success"
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
})


export const Transaction = mongoose.model("Transaction", transactionSchema);