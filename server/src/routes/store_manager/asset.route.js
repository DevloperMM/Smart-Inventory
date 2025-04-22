import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware";
import authorisedRoles from "../../middlewares/role.middleware";
import {
  issueAssetForRequest,
  receiveReturnForAsset,
} from "../../controllers/store_manager/asset.controller";

const router = Router();

router
  .route("/issue/:requestId")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    issueAssetForRequest
  );

router
  .route("/return/:assetIssuanceId")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    receiveReturnForAsset
  );

export default router;
