import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth/user.controller.js";
import { verifyAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyAuth, logoutUser);

export default router;
