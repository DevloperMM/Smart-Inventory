import { Router } from "express";
import {
  changePassword,
  getProfile,
  loginUser,
  logoutUser,
} from "../../controllers/user/auth.controller.js";
import verifyAuth from "../../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/change-password").patch(verifyAuth, changePassword);
router.route("/logout").post(verifyAuth, logoutUser);
router.route("/profile").get(verifyAuth, getProfile);

export default router;
