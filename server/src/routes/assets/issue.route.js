import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  getAllAssetIssuances,
  getAssetIssuancesByAssetId,
  getAssetsIssuedToMe,
  issueAssetForRequest,
} from "../../controllers/assets/issue.controller.js";

const router = Router();

router
  .route("/admin/issuances/assets")
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
  .route("/admin/issuances/assets/:assetId")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getAssetIssuancesByAssetId
  );

router
  .route("/users/issuances/assets")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager", "user"),
    getAssetsIssuedToMe
  );

export default router;
