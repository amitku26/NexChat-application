import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

//import path from "path";

dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));


// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
// })
// }

const port = process.env.PORT || 5000;
//const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => {
    console.log("MongoDB connected:", res.connection.host);

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });


  // import dotenv from "dotenv";
  // import express from "express";
  // import mongoose from "mongoose";
  // import cookieParser from "cookie-parser";
  // import cors from "cors";
  // import http from "http";
  // import { Server } from "socket.io";

  // import authRoute from "./routes/authRoute.js";
  // import messageRoute from "./routes/messageRoute.js";

  // dotenv.config();

  // const app = express();
  // const server = http.createServer(app);

  // // 🔥 Socket.IO (works on Railway/Render)
  // const io = new Server(server, {
  //   cors: {
  //     origin: "http://localhost:5173",
  //     credentials: true,
  //   },
  // });

  // io.on("connection", (socket) => {
  //   console.log("User connected:", socket.id);

  //   socket.on("disconnect", () => {
  //     console.log("User disconnected:", socket.id);
  //   });
  // });

  // // Middlewares
  // app.use(express.json({ limit: "10mb" }));
  // app.use(express.urlencoded({ limit: "10mb", extended: true }));
  // app.use(cookieParser());

  // app.use(
  //   cors({
  //     origin: "http://localhost:5173",
  //     credentials: true,
  //   })
  // );

  // // ✅ Test route (prevents Cannot GET /)
  // app.get("/", (req, res) => {
  //   res.send("Backend API running 🚀");
  // });

  // // Routes
  // app.use("/api/auth", authRoute);
  // app.use("/api/message", messageRoute);

  // // DB + Server
  // const PORT = process.env.PORT || 5000;

  // mongoose
  //   .connect(process.env.MONGODB_URI)
  //   .then(() => {
  //     console.log("MongoDB connected");
  //     server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  //   })
  //   .catch((err) => console.error(err));


   