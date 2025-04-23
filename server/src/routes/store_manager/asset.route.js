import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";
import {
  addAssetInStore,
  createDisposeForAsset,
  getAllAssetDisposals,
  getAllAssetIssuances,
  getAllAssets,
  issueAssetForRequest,
  receiveReturnForAsset,
} from "../../controllers/store_manager/asset.controller.js";

const router = Router();

router
  .route("/")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getAllAssets
  )
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    addAssetInStore
  );

router
  .route("/issuances")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getMyAssetIssuances
  );

router
  .route("/issuance/requests")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getAllUserRequests
  );

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

router
  .route("/disposals")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getAllAssetDisposals
  );

router
  .route("/dispose/:assetId")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    createDisposeForAsset
  );

export default router;
