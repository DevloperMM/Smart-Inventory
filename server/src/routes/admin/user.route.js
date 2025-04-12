import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../controllers/admin/user.controller.js";
import { verifyAuth } from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";

const router = Router();

router
  .route("/")
  .get(verifyAuth, authorisedRoles("ADMIN"), getUsers)
  .post(verifyAuth, authorisedRoles("ADMIN"), createUser);

router
  .route("/:id")
  .patch(verifyAuth, authorisedRoles("ADMIN"), updateUser)
  .delete(verifyAuth, authorisedRoles("ADMIN"), deleteUser);

export default router;
