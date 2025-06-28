import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  addConsumableInStore,
  editConsumable,
  getAllConsumables,
  getConsumablesByFilter,
  updateQty,
} from "../../controllers/consumables/consumable.controller.js";

const router = Router();

router
  .route("/")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getAllConsumables
  )
  .post(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    addConsumableInStore
  );

router.post(
  "/filter",
  verifyAuth,
  isPermitted("admin", "store-manager", "it-head"),
  getConsumablesByFilter
);

router
  .route("/:consumableId")
  .post(verifyAuth, isPermitted("admin", "it-head", "store-manager"), updateQty)
  .patch(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    editConsumable
  );

export default router;
