import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";
import {
  issueAsset,
  issueConsumable,
} from "../../controllers/store_manager/issue.controller.js";

const router = Router();

router
  .route("/asset")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    issueAsset
  );

router
  .route("/consumable")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    issueConsumable
  );

export default router;
