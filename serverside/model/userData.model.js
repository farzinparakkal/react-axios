import mongoose from "mongoose";
const userDataSchema = new mongoose.Schema({
    userId: { type: String },  
    nickname: { type: String },
    dob: { type: String },
    note:{type:String},
});

export default mongoose.model.userData||mongoose.model('userData',userDataSchema)