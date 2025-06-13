import express from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../src/lib/swagger.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing the routers
import manageUsers from "./routes/inventory/user.route.js";
import stockRouter from "./routes/inventory/stock.route.js";
import requestsRouter from "./routes/inventory/request.route.js";
import assetsRouter from "./routes/assets/asset.route.js";
import assetsIssuances from "./routes/assets/issue.route.js";
import assetsDisposals from "./routes/assets/dispose.route.js";
import consumablesRouter from "./routes/consumables/consumable.route.js";
import consumableIssuances from "./routes/consumables/issue.route.js";
import consumableDisposals from "./routes/consumables/dispose.route.js";
import transitRouter from "./routes/inventory/transit.route.js";
import transferRouter from "./routes/inventory/transfer.route.js";

import userAuthRouter from "./routes/user/auth.route.js";
import userRequestRouter from "./routes/user/requests.route.js";
import userIssueRouter from "./routes/user/issue.route.js";

// handling the routers
app.use("/api/v1/admin/users", manageUsers);
app.use("/api/v1/admin/stock", stockRouter);
app.use("/api/v1/admin/requests", requestsRouter);
app.use("/api/v1/admin/assets", assetsRouter);
app.use("/api/v1/admin/consumables", consumablesRouter);
app.use("/api/v1/admin/issuances", assetsIssuances, consumableIssuances);
app.use("/api/v1/admin/disposals", assetsDisposals, consumableDisposals);
app.use("/api/v1/admin/transits", transitRouter);
app.use("/api/v1/admin/transfers", transferRouter);

app.use("/api/v1/users/auth", userAuthRouter);
app.use("/api/v1/users/requests", userRequestRouter);
app.use("/api/v1/users/issuances", userIssueRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

export default app;
