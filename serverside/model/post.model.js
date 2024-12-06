import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    userId: { type: String },
    caption: { type: String },
    description: { type: String },
    images: [{ type: String }], 
    date: { type: String },
    time: { type: String } 
});

export default mongoose.model.post||mongoose.model('post',postSchema)