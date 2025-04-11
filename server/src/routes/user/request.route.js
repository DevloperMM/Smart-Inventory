import { Router } from "express";
import {
  cancelRequest,
  createRequest,
  getRequests,
} from "../../controllers/user/request.controller.js";
import { verifyAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyAuth, getRequests).post(verifyAuth, createRequest);
router.route("/:id").post(verifyAuth, cancelRequest);

export default router;
