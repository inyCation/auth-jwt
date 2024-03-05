import mongoose from "mongoose";

const schema = mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    hashedPassword: String,
})

export const User = mongoose.model("userInfo", schema);