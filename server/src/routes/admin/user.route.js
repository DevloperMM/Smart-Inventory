import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUserRole,
} from "../../controllers/admin/user.controller.js";

const router = Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").patch(updateUserRole).delete(deleteUser);

export default router;
