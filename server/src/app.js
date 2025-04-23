import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing the routers
import manageUsersRouter from "./routes/admin/user.route.js";

import assetsRouter from "./routes/store_manager/asset.route.js";
import consumablesRouter from "./routes/store_manager/consumable.route.js";
import requirementRouter from "./routes/store_manager/requirement.route.js";
import storeRouter from "./routes/store_manager/store.route.js";

import userAuthRouter from "./routes/user/auth.route.js";
import userRequestsRouter from "./routes/user/requests.route.js";
import userIssuancesRouter from "./routes/user/issuances.route.js";

// handling the routers
app.use("/api/v1/admin/user", manageUsersRouter);

app.use("/api/v1/manager/asset", assetsRouter);
app.use("/api/v1/manager/consumable", consumablesRouter);
app.use("/api/v1/manager/requirement", requirementRouter);
app.use("/api/v1/manager/stock", storeRouter);

app.use("/api/v1/user/auth", userAuthRouter);
app.use("/api/v1/user/requests", userRequestsRouter);
app.use("/api/v1/user/issuances", userIssuancesRouter);

export default app;
