import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
    full_name: String,
    profile: String,
    role: String,
    comment: String,
});
export default CommentsSchema;
