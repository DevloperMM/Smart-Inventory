import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  cancelTransitRequest,
  createTransitRequest,
  decideTransitRequest,
  getTransitRequests,
  validateTransitRequest,
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

router.patch(
  "/validate/:transitId",
  verifyAuth,
  isPermitted("admin", "it-head", "store-manager"),
  validateTransitRequest
);

router.patch(
  "/decide/:transitId",
  verifyAuth,
  isPermitted("admin", "it-head"),
  decideTransitRequest
);

router.patch(
  "/cancel/:transitId",
  verifyAuth,
  isPermitted("admin", "it-head", "store-manager"),
  cancelTransitRequest
);

export default router;
