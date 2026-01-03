// import jwt from "jsonwebtoken";

// export const tokenGeneration = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.secretkey, {
//     expiresIn: "7d",
//   });
//   res.cookie("jwt", token, {
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     sameSite: "strict",
//   });
// };

import jwt from "jsonwebtoken";

export const tokenGeneration = (userId, res) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // REQUIRED for HTTPS (Render)
    sameSite: "none", // REQUIRED for cross-origin
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
