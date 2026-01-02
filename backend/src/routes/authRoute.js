import express from "express";
import upload from "../middlewares/multer.js";
import { checkAuth } from "../middlewares/authMiddleware.js";

const route = express.Router();
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/authController.js";

route.post("/signup", signup);

route.post("/login", login);

route.get("/logout", logout);

route.put(
  "/update-profile",
  checkAuth,
  upload.single("profilepic"),
  updateProfile
);

export default route;
