import { Router } from "express";

import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import { getAssetsIssuedToMe } from "../../controllers/assets/issue.controller.js";
import { getConsumablesIssuedToMe } from "../../controllers/consumables/issue.controller.js";

const router = Router();

router
  .route("/assets")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager", "user"),
    getAssetsIssuedToMe
  );

router
  .route("/consumables")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager", "user"),
    getConsumablesIssuedToMe
  );

export default router;
