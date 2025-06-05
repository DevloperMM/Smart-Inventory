import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  changeStockAlert,
  getStock,
} from "../../controllers/inventory/stock.controller.js";

const router = Router();

router
  .route("/")
  .get(verifyAuth, isPermitted("admin", "it-head", "store-manager"), getStock);

router
  .route("/:stockId")
  .patch(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    changeStockAlert
  );

export default router;
