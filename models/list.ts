import mongoose from "mongoose";

const ListMasterSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
        },
        last_name: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    }
);

const ListMaster = mongoose.models.listMaster || mongoose.model("listMaster", ListMasterSchema);

export default ListMaster;
