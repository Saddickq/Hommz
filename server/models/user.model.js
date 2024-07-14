import { Schema, model } from "mongoose";

const UserSchema = Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      match: [/.+\@.+\..+/, 'Please provide a valid email address'],
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long']
    },
    avatar: {
        type: String,
        default: "https://res-console.cloudinary.com/dh9q1rj0k/thumbnails/v1/image/upload/v1720953282/bmV3VXNlcl9rcXduYnI"
    },
  },
  {
    timestamps: true,
  }
);

const User = model("Users", UserSchema);

export default User;
