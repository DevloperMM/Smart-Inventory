import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import authorisedRoles from "../../middlewares/role.middleware.js";
import {
  approveRequirement,
  approveIssuance,
  approveDisposal,
} from "../../controllers/it_head/approvals.controller.js";

const router = Router();

router
  .route("/requirement")
  .post(verifyAuth, authorisedRoles("ADMIN", "IT-HEAD"), approveRequirement);

router
  .route("/issue")
  .post(verifyAuth, authorisedRoles("ADMIN", "IT-HEAD"), approveIssuance);

router
  .route("/disposal")
  .post(verifyAuth, authorisedRoles("ADMIN", "IT-HEAD"), approveDisposal);

export default router;
