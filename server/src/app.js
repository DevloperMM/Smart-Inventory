import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing the routers
import manageUsersRouter from "./routes/admin/user.route.js";

import approvalsRouter from "./routes/it_head/approvals.route.js";

import requestsRouter from "./routes/store_manager/user_requests.route.js";
import issuanceRouter from "./routes/store_manager/issue.route.js";
import periodicCheckRouter from "./routes/store_manager/periodic_check.route.js";
import disposalRouter from "./routes/store_manager/dispose.route.js";
import stockRouter from "./routes/store_manager/stock.route.js";

import userAuthRouter from "./routes/user/auth.route.js";
import userRequestRouter from "./routes/user/request.route.js";

// handling the routers
app.use("/api/v1/admin/user", manageUsersRouter);

app.use("/api/v1/admin/approve", approvalsRouter);

app.use("/api/v1/admin/stock", stockRouter);
app.use("/api/v1/admin/user-request", requestsRouter);
app.use("/api/v1/admin/issue", issuanceRouter);
app.use("/api/v1/admin/periodic-check", periodicCheckRouter);
app.use("/api/v1/admin/dispose", disposalRouter);

app.use("/api/v1/user/auth", userAuthRouter);
app.use("/api/v1/user/request", userRequestRouter);

export default app;
