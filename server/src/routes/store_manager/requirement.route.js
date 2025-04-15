import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";
import {
  createRequirement,
  deleteRequirementPreview,
  editRequirementPreview,
  getAllApprovedRequirements,
  getAllPendingRequirements,
  getAllRejectedRequirements,
} from "../../controllers/store_manager/requirement.controller.js";

const router = Router();

router
  .route("/")
  .post(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    createRequirement
  );

router
  .route("/pending")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getAllPendingRequirements
  );

router
  .route("/approved")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getAllApprovedRequirements
  );

router
  .route("/rejected")
  .get(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    getAllRejectedRequirements
  );

router
  .route("/:id")
  .patch(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    editRequirementPreview
  )
  .delete(
    verifyAuth,
    authorisedRoles("ADMIN", "IT-HEAD", "STORE-MANAGER"),
    deleteRequirementPreview
  );

export default router;
