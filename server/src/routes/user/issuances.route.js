import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";
import {
  myAssetIssuances,
  myConsumableIssuances,
  returnIssuedAsset,
  returnIssuedConsumable,
} from "../../controllers/user/issuances.controller.js";

const router = Router();

router
  .route("/asset")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER", "USER"),
    myAssetIssuances
  );

router
  .route("/consumable")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER", "USER"),
    myConsumableIssuances
  );

router
  .route("/asset/:assetIssuanceId")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER", "USER"),
    returnIssuedAsset
  );

router
  .route("/consumable/:consumableIssuanceId")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER", "USER"),
    returnIssuedConsumable
  );

export default router;
