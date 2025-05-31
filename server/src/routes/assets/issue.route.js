import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  getAllAssetIssuances,
  getAssetIssuancesByAssetId,
  getUnissuedAssets,
  handleIssuedAsset,
  issueAssetForRequest,
} from "../../controllers/assets/issue.controller.js";

const router = Router();

router
  .route("/assets")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getAllAssetIssuances
  )
  .post(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    issueAssetForRequest
  );

router
  .route("/assets/filter/:equipNo")
  .get(
    verifyAuth,
    isPermitted("admin", "store-manager", "it-head"),
    getUnissuedAssets
  );

router.get(
  "/assets/a/:assetId",
  verifyAuth,
  isPermitted("admin", "it-head", "store-manager"),
  getAssetIssuancesByAssetId
);

router.patch(
  "/assets/i/:assetIssueId",
  verifyAuth,
  isPermitted("admin", "it-head", "store-manager"),
  handleIssuedAsset
);

export default router;
