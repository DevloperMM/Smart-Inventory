import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  cancelTransitRequest,
  createTransitRequest,
  decideTransitRequest,
  getTransitRequests,
} from "../../controllers/inventory/transit.controller.js";

const router = Router();

router
  .route("/")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getTransitRequests
  )
  .post(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    createTransitRequest
  );

router
  .route("/:transitId")
  .post(verifyAuth, isPermitted("admin", "it-head"), decideTransitRequest)
  .patch(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    cancelTransitRequest
  );

export default router;
