import mongoose from "mongoose";

const TechnologiesSchema = new mongoose.Schema({
    name: String,
});
export default TechnologiesSchema;
