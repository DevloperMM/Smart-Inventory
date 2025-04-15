import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";
import {
  deleteAssetDisposePreview,
  deleteConsumableDisposePreview,
  disposeAsset,
  disposeConsumable,
  editAssetDisposePreview,
  editConsumableDisposePreview,
  getApprovedAssetDisposals,
  getApprovedConsumableDisposals,
  getPendingAssetDisposals,
  getPendingConsumableDisposals,
  getRejectedAssetDisposals,
  getRejectedConsumableDisposals,
} from "../../controllers/store_manager/dispose.controller.js";

const router = Router();

router
  .route("/asset")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    disposeAsset
  );

router
  .route("/asset/pending")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getPendingAssetDisposals
  );

router
  .route("/asset/approved")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getApprovedAssetDisposals
  );

router
  .route("/asset/rejected")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getRejectedAssetDisposals
  );

router
  .route("/asset/:id")
  .patch(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    editAssetDisposePreview
  )
  .delete(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    deleteAssetDisposePreview
  );

router
  .route("/consumable")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    disposeConsumable
  );

router
  .route("/consumable/pending")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getPendingConsumableDisposals
  );

router
  .route("/consumable/approved")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getApprovedConsumableDisposals
  );

router
  .route("/consumable/rejected")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getRejectedConsumableDisposals
  );

router
  .route("/consumable/:id")
  .patch(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    editConsumableDisposePreview
  )
  .delete(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    deleteConsumableDisposePreview
  );

export default router;
