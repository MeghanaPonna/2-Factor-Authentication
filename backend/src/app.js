// // import express from "express";
// // import cors from "cors";  
// // import User from "./models/User.js";
// // import authRoutes from "./routes/auth.routes.js";
// // import userRoutes from "./routes/user.routes.js";



// // const app = express();

// // app.use(express.json());
// // /* 🔥 CORS CONFIG */
// // app.use(
// //   cors({
// //     origin: "https://2-factor-authentication-lovat.vercel.app", // frontend
// //     credentials: true,
// //   })
// // );

// // app.get("/", (req, res) => {
// //   res.status(200).send("Backend is running");
// // });

// // app.use("/api/auth", authRoutes);
// // app.use("/api/user", userRoutes);

// // export default app;



// import express from "express";
// import cors from "cors";
// import User from "./models/User.js";
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";

// const app = express();

// app.use(express.json());

// /* 🔥 CORS CONFIG */
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://2-factor-authentication-lovat.vercel.app"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS not allowed"));
//       }
//     },
//     credentials: true,
//   })
// );

// /* Handle preflight requests */
// app.options("*", cors());

// app.get("/", (req, res) => {
//   res.status(200).send("Backend is running");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);

// export default app;




import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

/* CORS CONFIG */
const allowedOrigins = [
  "http://localhost:5173",
  "https://2-factor-authentication-lovat.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;