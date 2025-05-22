import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  decideRequest,
  getAllRequests,
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
    "/:requestId",
    verifyAuth,
    isPermitted("admin", "it-head"),
    decideRequest
  );

export default router;
