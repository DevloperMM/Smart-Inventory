import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  addAssetInStore,
  getAllAssets,
  getAssetById,
  toggleAssetMaintenance,
  updateAssetDetails,
  getAssetsByFilter,
} from "../../controllers/assets/asset.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Assets
 *   description: Admin Routes to manage assets
 */

/**
 * @swagger
 * /api/v1/admin/assets:
 *   get:
 *     summary: Get all Assets
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Assets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Asset'
 */
router.get(
  "/",
  verifyAuth,
  isPermitted("admin", "store-manager", "it-head"),
  getAllAssets
);

router.post(
  "/",
  verifyAuth,
  isPermitted("admin", "store-manager", "it-head"),
  addAssetInStore
);

router.get(
  "/filter",
  verifyAuth,
  isPermitted("admin", "store-manager", "it-head"),
  getAssetsByFilter
);

router.get(
  "/:assetId",
  verifyAuth,
  isPermitted("admin", "store-manager", "it-head"),
  getAssetById
);

router.put(
  "/:assetId",
  verifyAuth,
  isPermitted("admin", "store-manager", "it-head"),
  updateAssetDetails
);

router.patch(
  "/:assetId",
  verifyAuth,
  isPermitted("admin", "store-manager", "it-head"),
  toggleAssetMaintenance
);

export default router;
