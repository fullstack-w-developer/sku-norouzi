import mongoose from "mongoose";

const SharepostSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        reciveUsers: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        postId: {
            type: mongoose.Types.ObjectId,
            ref: "post",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Sharepost = mongoose.models.sharepost || mongoose.model("sharepost", SharepostSchema);

export default Sharepost;
