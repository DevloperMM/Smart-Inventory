import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  createStock,
  getAllAssetCategories,
  getAllConsumableCategories,
  getStock,
} from "../../controllers/inventory/stock.controller.js";

const router = Router();

router
  .route("/")
  .get(verifyAuth, isPermitted("admin", "it-head", "store-manager"), getStock)
  .post(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    createStock
  );

router
  .route("/assets")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getAllAssetCategories
  );

router
  .route("/consumables")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getAllConsumableCategories
  );

export default router;
