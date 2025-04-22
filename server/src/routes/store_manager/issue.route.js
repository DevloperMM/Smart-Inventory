import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";
import {} from "../../controllers/store_manager/issue.controller.js";

const router = Router();

// Assets
router
  .route("/asset")
  .get(verifyAuth, authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"));

router
  .route("/asset/requests")
  .get(verifyAuth, authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"));

router
  .route("/asset/request/:requestId")
  .post(verifyAuth, authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"));

// Consumables
router
  .route("/consumable")
  .get(verifyAuth, authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"));

router
  .route("/consumable/requests")
  .get(verifyAuth, authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"));

router
  .route("/consumable/request/:requestId")
  .post(verifyAuth, authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"));

export default router;
