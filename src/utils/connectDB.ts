import mongoose from "mongoose";
import { mongodb_uri } from "../helpers/constants/env-variables";

const connectDB = () => {
    if (mongoose.connections[0].readyState) {
        console.log("already connected");
        return;
    }
    mongoose.set("strictQuery", false);
    mongoose
        .connect(mongodb_uri)
        .then(() => {
            console.log("connected DB");
        })
        .catch((err) => console.log(err));
};

export default connectDB;
