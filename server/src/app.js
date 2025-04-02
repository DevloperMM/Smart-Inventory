import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing the routers
import userRouter from "./routes/user.route.js";

// routing the routes
app.use("/api/v1/users", userRouter);

export default app;
