import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  decideAssetRequest,
  getAllRequests,
  rejectConsumableRequest,
} from "../../controllers/inventory/request.controller.js";

const router = Router();

router
  .get(
    "/",
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getAllRequests
  )
  .post(
    "/a/:requestId",
    verifyAuth,
    isPermitted("admin", "it-head"),
    decideAssetRequest
  )
  .post(
    "/c/:requestId",
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    rejectConsumableRequest
  );

export default router;
