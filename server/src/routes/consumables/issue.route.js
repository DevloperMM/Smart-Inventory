import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  getAllConsumableIssuances,
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
  .route("/consumables/:consumableIssueId")
  .post(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager", "user"),
    handleIssuedConsumable
  );

export default router;
