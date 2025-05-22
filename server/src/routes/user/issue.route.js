import { Router } from "express";

import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import { getAssetsIssuedToMe } from "../../controllers/assets/issue.controller.js";

const router = Router();

router
  .route("/users/issuances/assets")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager", "user"),
    getAssetsIssuedToMe
  );

export default router;
