import { Router } from "express";
import verifyAuth from "../../middlewares/auth.middleware.js";
import isPermitted from "../../middlewares/role.middleware.js";
import {
  decideAssetRequest,
  decideConsumableRequest,
  getAllRequests,
} from "../../controllers/inventory/request.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Admin routes for managing requests
 */

/**
 * @swagger
 * /api/v1/admin/requests:
 *   get:
 *     summary: Get all asset/consumable requests
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Request'
 */
router.get(
  "/",
  verifyAuth,
  isPermitted("admin", "it-head", "store-manager"),
  getAllRequests
);

/**
 * @swagger
 * /api/v1/admin/requests/{requestId}:
 *   post:
 *     summary: Decide (approve/reject) an asset request
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: requestId
 *         in: path
 *         required: true
 *         description: ID of the request to decide
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *               decisionInfo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request status updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Request not found
 */
router.post(
  "/:requestId",
  verifyAuth,
  isPermitted("admin", "it-head"),
  decideAssetRequest
);

/**
 * @swagger
 * /api/v1/admin/requests/{requestId}:
 *   put:
 *     summary: Decide a consumable request
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: requestId
 *         in: path
 *         required: true
 *         description: ID of the request to decide
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request decided
 *       400:
 *         description: Missing reason
 *       404:
 *         description: Request not found
 */
router.put(
  "/:requestId",
  verifyAuth,
  isPermitted("admin", "it-head", "store-manager"),
  decideConsumableRequest
);

export default router;
