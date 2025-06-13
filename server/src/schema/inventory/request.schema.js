/**
 * @swagger
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         itemType:
 *           type: string
 *         requestedBy:
 *           type: integer
 *         endUser:
 *           type: string
 *         category:
 *           type: string
 *         storeId:
 *           type: integer
 *         purpose:
 *           type: string
 *         decidedBy:
 *           type: integer
 *         decisionInfo:
 *           type: string
 *         status:
 *           type: string
 *       required:
 *         - itemType
 *         - requestedBy
 *         - endUser
 *         - category
 *         - storeId
 *         - purpose
 *         - status
 */
