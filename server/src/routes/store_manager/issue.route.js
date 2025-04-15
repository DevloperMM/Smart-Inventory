import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";
import {
  deleteAssetIssuancePreview,
  deleteConsumableIssuancePreview,
  editAssetIssuancePreview,
  editConsumableIssuancePreview,
  getApprovedAssetIssuances,
  getApprovedConsumableIssuances,
  getPendingAssetIssuances,
  getPendingConsumableIssuances,
  getRejectedAssetIssuances,
  getRejectedConsumableIssuances,
  issueAsset,
  issueConsumable,
} from "../../controllers/store_manager/issue.controller.js";

const router = Router();

router
  .route("/asset")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    issueAsset
  );

router
  .route("/asset/pending")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getPendingAssetIssuances
  );

router
  .route("/asset/approved")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getApprovedAssetIssuances
  );

router
  .route("/asset/rejected")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getRejectedAssetIssuances
  );

router
  .route("/asset/:id")
  .patch(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    editAssetIssuancePreview
  )
  .delete(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    deleteAssetIssuancePreview
  );

router
  .route("/consumable")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    issueConsumable
  );

router
  .route("/consumable/pending")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getPendingConsumableIssuances
  );

router
  .route("/consumable/approved")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getApprovedConsumableIssuances
  );

router
  .route("/consumable/rejected")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getRejectedConsumableIssuances
  );

router
  .route("/consumable/:id")
  .patch(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    editConsumableIssuancePreview
  )
  .delete(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    deleteConsumableIssuancePreview
  );

export default router;
