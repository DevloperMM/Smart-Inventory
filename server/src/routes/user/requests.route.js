import { Router } from "express";
import {
  cancelRequest,
  createRequest,
  getAllRequests,
} from "../../controllers/user/requests.controller.js";
import verifyAuth from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";

const router = Router();

router
  .route("/")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER", "USER"),
    getAllRequests
  )
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER", "USER"),
    createRequest
  );

router
  .route("/:requestId")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER", "USER"),
    cancelRequest
  );

export default router;
