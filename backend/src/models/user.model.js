import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    customerId : {
        type : String,
        required : true,
        unique: true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique: true,
        required : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    balance : {
        type: Number,
        default : 0
    },
    transactions : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Transaction'
        }
    ]
}, {timestamps : true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(this.password, password);
}

export const User = mongoose.model('User', userSchema)