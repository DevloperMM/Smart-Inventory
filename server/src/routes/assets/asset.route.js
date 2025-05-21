import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  addAssetInStore,
  getAllAssets,
  getAssetById,
  toggleAssetMaintenance,
  updateAssetDetails,
  getAssetsByFilter,
  getAssetByEquipNo,
} from "../../controllers/assets/asset.controller.js";

const router = Router();

router
  .route("/")
  .get(
    verifyAuth,
    isPermitted("admin", "store-manager", "it-head"),
    getAllAssets
  )
  .post(
    verifyAuth,
    isPermitted("admin", "store-manager", "it-head"),
    addAssetInStore
  );

router
  .get(
    "/filter",
    verifyAuth,
    isPermitted("admin", "store-manager", "it-head"),
    getAssetsByFilter
  )
  .get(
    "/filter/:equipNo",
    verifyAuth,
    isPermitted("admin", "store-manager", "it-head"),
    getAssetByEquipNo
  );

router
  .route("/:assetId")
  .get(
    verifyAuth,
    isPermitted("admin", "store-manager", "it-head"),
    getAssetById
  )
  .put(
    verifyAuth,
    isPermitted("admin", "store-manager", "it-head"),
    updateAssetDetails
  )
  .patch(
    verifyAuth,
    isPermitted("admin", "store-manager", "it-head"),
    toggleAssetMaintenance
  );

export default router;
