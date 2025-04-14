import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";
import {
  getAllApprovedRequests,
  getAllPendingRequests,
  getAllRejectedRequests,
} from "../../controllers/store_manager/user_requests.controller.js";

const router = Router();

router
  .route("/pending")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getAllPendingRequests
  );

router
  .route("/approved")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getAllApprovedRequests
  );

router
  .route("/rejected")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getAllRejectedRequests
  );

export default router;
