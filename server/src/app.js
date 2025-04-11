import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing the routers
import userAuthRouter from "./routes/auth/user.route.js";
import roleAuthRouter from "./routes/auth/role.route.js";

import adminUserRouter from "./routes/admin/user.route.js";

import userRequestRouter from "./routes/user/request.route.js";

// handling the routers
app.use("/api/v1/auth/user", userAuthRouter);

app.use("/api/v1/admin/user", adminUserRouter);

app.use("/api/v1/user/request", userRequestRouter);

export default app;
