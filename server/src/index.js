import dotenv from "dotenv";
import db from "./lib/db.js";
import app from "./app.js";
import { setupAssociations } from "./models/index.js";

dotenv.config();

db.sync({ force: true })
  .then(() => {
    console.log("SQL Server established successfully");
    // setupAssociations()
    //   .then(() => {
    //     console.log("Models associated successfully");
    //   })
    //   .catch((err) => {
    //     console.log("Associating Models error:", err);
    //   });

    app.on("error", (err) => {
      console.log("Error while listening to port");
      throw err;
    });

    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`Node is listening to http://localhost:${port}`);
    });
  })

  .catch((err) => {
    console.error("DB Connection error:", err);
    process.exit(1);
  });
