import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  cancelDisposeRequest,
  createConsumableDispose,
  decideDisposeRequest,
  getAllConsumableDisposals,
  sellDisposedConsumable,
} from "../../controllers/consumables/dispose.controller.js";

const router = Router();

router
  .route("/consumables")
  .get(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    getAllConsumableDisposals
  )
  .post(
    verifyAuth,
    isPermitted("admin", "it-head", "store-manager"),
    createConsumableDispose
  );

router.patch(
  "/consumables/cancel/:consumableDisposeId",
  verifyAuth,
  isPermitted("admin", "it-head"),
  cancelDisposeRequest
);

router.patch(
  "/consumables/decide/:consumableDisposeId",
  verifyAuth,
  isPermitted("admin", "it-head"),
  decideDisposeRequest
);

router.patch(
  "/consumables/sell/:consumableDisposeId",
  verifyAuth,
  isPermitted("admin", "it-head"),
  sellDisposedConsumable
);

export default router;
