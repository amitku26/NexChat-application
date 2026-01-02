import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(400).json({ message: "token is required." });
    }
    const decode = jwt.verify(token, process.env.secretkey);
    if (!decode) {
      res.status(401).json({ message: "unauthorised-invalid token" });
    }
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error in checkAuth middleware", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};


// import jwt from "jsonwebtoken";
// import User from "../model/userModel.js";

// export const checkAuth = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;

//     if (!token) {
//       return res.status(401).json({ message: "Token is required" });
//     }

//     const decoded = jwt.verify(token, process.env.secretkey);
//     if (!decoded) {
//       return res.status(401).json({ message: "Unauthorized token" });
//     }

//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("error in checkAuth middleware", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
