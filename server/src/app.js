import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing the routers
import manageUserRouter from "./routes/user/user.route.js";
import stockRouter from "./routes/inventory/stock.route.js";
import assetsRouter from "./routes/assets/asset.route.js";
import consumablesRouter from "./routes/consumables/consumable.route.js";
import authRouter from "./routes/user/auth.route.js";
import requestsRouter from "./routes/inventory/request.route.js";
import assetsIssuances from "./routes/assets/issue.route.js";

// handling the routers
app.use("/api/v1/admin/users", manageUserRouter);
app.use("/api/v1/admin/stock", stockRouter);
app.use("/api/v1/admin/assets", assetsRouter);
app.use("/api/v1/admin/consumables", consumablesRouter);
app.use("/api/v1/users/auth", authRouter);
app.use("/api/v1", requestsRouter);
app.use("/api/v1", assetsIssuances);

export default app;
