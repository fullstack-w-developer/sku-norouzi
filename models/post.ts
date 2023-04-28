import mongoose from "mongoose";
import CommentsSchema from "./comments";
import TechnologiesSchema from "./technologies";

const PostSchema = new mongoose.Schema(
    {
        masterId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        status: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        file: {
            url: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
        },
        technologies: [TechnologiesSchema],
        student: {
            type: Boolean,
            default: false,
        },
        zip: {
            url: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
        },
        comments: [CommentsSchema],
        description: {
            type: String,
        },
        liked: {
            type: Array,
        },
        saves: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);

const Posts = mongoose.models.post || mongoose.model("post", PostSchema);

export default Posts;
