import { Router } from "express";
import {
  cancelRequest,
  createRequest,
  getRequests,
} from "../../controllers/user/request.controller.js";
import { verifyAuth } from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router
  .route("/")
  .get(verifyAuth, asyncHandler(authorisedRoles("User")), getRequests)
  .post(verifyAuth, asyncHandler(authorisedRoles("User")), createRequest);

router
  .route("/:id")
  .post(verifyAuth, asyncHandler(authorisedRoles("User")), cancelRequest);

export default router;
