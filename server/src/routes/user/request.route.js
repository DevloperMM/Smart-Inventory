import { Router } from "express";
import {
  cancelRequest,
  createRequest,
  getRequests,
} from "../../controllers/user/request.controller.js";

const router = Router();

router.route("/").get(getRequests).post(createRequest);
router.route("/:id").post(cancelRequest);

export default router;
