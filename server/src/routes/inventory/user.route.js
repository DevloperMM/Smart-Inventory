import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../../controllers/user/user.controller.js";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";

const router = Router();

router
  .route("/")
  .post(verifyAuth, isPermitted("admin", "it-head"), createUser)
  .get(verifyAuth, isPermitted("admin", "it-head"), getUsers);

router
  .route("/:userId")
  .get(verifyAuth, isPermitted("admin", "it-head"), getUserById)
  .patch(verifyAuth, isPermitted("admin", "it-head"), updateUser)
  .delete(verifyAuth, isPermitted("admin", "it-head"), deleteUser);

export default router;
