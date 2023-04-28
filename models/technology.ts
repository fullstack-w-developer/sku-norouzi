import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Technology = mongoose.models.technology || mongoose.model("technology", TechnologySchema);

export default Technology;
