import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  createTransfer,
  getTranferRecords,
  receiveTransfer,
} from "../../controllers/inventory/transfer.controller.js";

const router = Router();

router
  .route("/")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getTranferRecords
  )
  .post(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    createTransfer
  );

router.patch(
  "/receive/:transferId",
  verifyAuth,
  isPermitted("admin", "it-head", "store-manager"),
  receiveTransfer
);

export default router;
