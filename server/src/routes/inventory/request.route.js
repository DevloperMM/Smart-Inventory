import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  cancelRequest,
  createRequest,
  decideRequest,
  getAllRequests,
  getMyRequests,
} from "../../controllers/inventory/request.controller.js";

const router = Router();

router
  .get(
    "/admin/requests",
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getAllRequests
  )
  .post(
    "/admin/requests/:requestId",
    verifyAuth,
    isPermitted("admin", "it-head"),
    decideRequest
  );

router
  .post(
    "/users/requests",
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager", "user"),
    createRequest
  )
  .get(
    "/users/requests",
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager", "user"),
    getMyRequests
  )
  .patch(
    "/users/requests/:requestId",
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager", "user"),
    cancelRequest
  );

export default router;
