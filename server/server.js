import express from "express";
import cors from "cors";
import { DB_URL, PORT, SECRET } from "./config/index.js";
import mongoose from "mongoose";
import AuthRoutes from "./routes/users.routes.js";
import PhotosRoute from "./routes/photos.routes.js";
import PlacesRoutes from "./routes/places.routes.js";
import BookingRoutes from "./routes/bookings.routes.js";
import cookieParser from "cookie-parser";
// import session from "express-session";
// import passport from "passport";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import "./config/passport.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app.use(
//   session({
//     secret: SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 * 60 },
//   })
// );
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/auth", AuthRoutes);
app.use(PhotosRoute);
app.use(PlacesRoutes);
app.use(BookingRoutes);
app.use("/uploads", express.static(__dirname + "/uploads"));

// const isAuth = (req, res, next) => {
//   req.user ? next() : res.status(401).send("Unauthorized");
// };

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:5173/",
//     failureRedirect: "/auth/google/failure",
//   })
// );

// app.get("/auth/google/success", (req, res) => {
//     if (req.user) {
//         return res.status(200).json({user: req.user})
//     }
//     return res.json(null)
// });

// app.get("/auth/google/failure", (req, res) => {
//   return res.status(500).send("Something went wrong");
// });

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, SECRET);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: "No user was found" });
  }
  return res.json(null);
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`server is running on localhost port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database failed to connect", error);
  });