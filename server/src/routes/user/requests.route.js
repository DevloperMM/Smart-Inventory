import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  cancelRequest,
  createRequest,
  getMyRequests,
} from "../../controllers/inventory/request.controller.js";

const router = Router();

router
  .route("/")
  .post(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager", "user"),
    createRequest
  )
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager", "user"),
    getMyRequests
  );

router.patch(
  "/:requestId",
  verifyAuth,
  isPermitted("admin", "it-head", "store-manager", "user"),
  cancelRequest
);

export default router;
