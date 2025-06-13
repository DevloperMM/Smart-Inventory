import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  cancelDisposeRequest,
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

router.patch(
  "/assets/cancel/:assetDisposeId",
  verifyAuth,
  isPermitted("admin", "it-head", "store-manager"),
  cancelDisposeRequest
);

router.patch(
  "/assets/decide/:assetDisposeId",
  verifyAuth,
  isPermitted("admin", "it-head"),
  decideDisposeRequest
);

router.patch(
  "/assets/sell/:assetDisposeId",
  verifyAuth,
  isPermitted("admin", "it-head", "store-manager"),
  sellDisposedAsset
);

export default router;
