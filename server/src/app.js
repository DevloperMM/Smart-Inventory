import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing the routers
import adminUserRouter from "./routes/admin/user.route.js";

import userAuthRouter from "./routes/user/auth.route.js";
import userRequestRouter from "./routes/user/request.route.js";

// admin routes
app.use("/api/v1/admin/user", adminUserRouter);

// it-head routes

// stock-manager routes

// user routes
app.use("/api/v1/user/auth", userAuthRouter);
app.use("/api/v1/user/request", userRequestRouter);

export default app;
