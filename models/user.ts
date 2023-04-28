import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
        },
        full_name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: { type: String, required: true, trim: true },
        status: { type: String, required: true },
        student_number: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        profile: {
            url: {
                type: String,
                default:
                    "https://www.citypng.com/public/uploads/small/11640168385jtmh7kpmvna5ddyynoxsjy5leb1nmpvqooaavkrjmt9zs7vtvuqi4lcwofkzsaejalxn7ggpim4hkg0wbwtzsrp1ldijzbdbsj5z.png",
            },
            id: {
                type: String,
                default: "",
            },
        },
        role: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.user || mongoose.model("user", UserSchema);

export default User;
