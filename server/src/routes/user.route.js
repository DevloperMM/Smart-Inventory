import { Router } from "express";
import { createUser, getUserById } from "../controllers/user.controller.js";

const router = Router();

router.route("/").post(createUser);
router.route("/:id").get(getUserById);

export default router;
