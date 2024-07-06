import { Schema, model } from "mongoose";

const UserSchema = Schema(
    {
        username: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        googleId: { type: String, unique: true },
        avatar: { type: String }
    },
    {
        timestamps: true
    }
);

const User = model("user", UserSchema)

export default User;