import { Router } from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/user/auth.controller.js";
import verifyAuth from "../../middlewares/auth.middleware.js";

const router = Router();

// Registering the user is more likely to be done by admin only which may cause no use of signup here
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/change-password").patch(verifyAuth, changePassword);
router.route("/logout").post(verifyAuth, logoutUser);

export default router;
