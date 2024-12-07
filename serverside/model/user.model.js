import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    pic:{type: String},
    username: { type: String },  
    email: { type: String },
    pass: { type: String },
    otp:{type:Number},
});

export default mongoose.model.user||mongoose.model('user',userSchema)