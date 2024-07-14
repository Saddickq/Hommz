import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET, NODE_ENV } from "../config/index.js";

class AuthController {
  static async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;

      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new Error("This email is alredy registered to a different user");
      }
      const salt = await bcrypt.genSalt(10);

      const newUser = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, salt),
        avatar: "https://res.cloudinary.com/dh9q1rj0k/image/upload/v1720953282/newUser_kqwnbr.jpg"
      });

      if (!newUser) {
        return res.status(500).json({
          message: "User was not registerd successfully please try again",
        });
      }
      return res.status(201).json({
        message: "user registered successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred during registration. Please try again.",
        Error: error.message,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = {
          userId: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar
        };
        const token = jwt.sign(payload, SECRET, { expiresIn: "5h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 5 * 60 * 60 * 1000
        });

        return res.status(200).json(user)
      }
      return res.status(401).json({
        message: "Incorrect Password"
      })
    } catch (error) {
        return res.status(500).json({
            message: "Login was unsuccessful please try again later"
        })
    }
  }
  static logoutUser(req, res) {
    res.cookie("token", "", {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'None' : 'Lax',
    }).json({ success: true });

  }
}

export default AuthController;
