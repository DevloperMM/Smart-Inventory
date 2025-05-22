import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  createAssetDispose,
  decideDisposeRequest,
  getAllAssetDisposals,
  sellDisposedAsset,
} from "../../controllers/assets/dispose.controller.js";

const router = Router();

router
  .route("/assets")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getAllAssetDisposals
  )
  .post(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    createAssetDispose
  );

router
  .route("/assets/:assetDisposeId")
  .post(verifyAuth, isPermitted("admin", "it-head"), decideDisposeRequest)
  .patch(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    sellDisposedAsset
  );

export default router;
