import dotenv from "dotenv";
import db from "./lib/db.js";
import app from "./app.js";

dotenv.config();

db.sync()
  .then(() => {
    console.log("SQL Server established successfully");

    app.on("error", (err) => {
      console.log("Error while listening to port- ");
      throw err;
    });

    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`Node is listening to http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the DB:", err);
    process.exit(1);
  });
