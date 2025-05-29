import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  addConsumableInStore,
  editConsumable,
  getAllConsumables,
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

router
  .route("/:consumableId")
  .patch(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    editConsumable
  );

export default router;
