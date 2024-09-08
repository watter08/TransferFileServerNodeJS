// src/routes/userRoutes.ts

import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get('/users', (req: Request, res: Response) => {
  res.json([{ id: '1', name: 'John Doe' }]);
});

export default router;
