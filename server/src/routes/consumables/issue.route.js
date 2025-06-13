import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  getAllConsumableIssuances,
  getIssuedConsumablestoAsset,
  handleIssuedConsumable,
  issueConsumableForRequest,
} from "../../controllers/consumables/issue.controller.js";

const router = Router();

router
  .route("/consumables")
  .post(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    issueConsumableForRequest
  )
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getAllConsumableIssuances
  );

router
  .route("/consumables/a/:assetId")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getIssuedConsumablestoAsset
  );

router
  .route("/consumables/:consumableIssuanceId")
  .post(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    handleIssuedConsumable
  );

export default router;
