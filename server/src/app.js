import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing the routers

// routing the routes

export default app;
