import { tokenGeneration } from "../lib/token.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
// import cloudinary from "../lib/cloudinary.js";


          // signup //
export const signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    tokenGeneration(newUser._id, res);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

              // LOGIN  //
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    tokenGeneration(user._id, res);

    res.status(200).json(user);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

         // = LOGOUT //
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

           // UPDATE PROFILE //
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { profilepic } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilepic },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


