/**
 * @swagger
 *   components:
 *    schemas:
 *      Maintenance:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            type:
 *              type: string
 *              description: Type of maintenance.
 *            description:
 *              type: string
 *            cost:
 *              type: number
 *              format: float
 *            date:
 *              type: string
 *              format: date-time
 *            duration:
 *              type: number
 *              format: int32
 *            cars:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Car'
 */

import express, { NextFunction, Request, Response } from 'express';
import maintenanceService from '../service/maintenance.service';
import { MaintenanceInput } from '../types';

const maintenanceRouter = express.Router();

/**
 * @swagger
 * /maintenances:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all maintenances.
 *     responses:
 *       200:
 *         description: A list of maintenances.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Maintenance'
 */
maintenanceRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const maintenances = await maintenanceService.getAllMaintenances();
        res.status(200).json(maintenances);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /maintenances/{id}:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Get a maintenance by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The maintenance id.
 *      responses:
 *          200:
 *              description: A maintenance object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Maintenance'
 */
maintenanceRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const maintenance = await maintenanceService.getMaintenanceById(Number(req.params.id));
        res.status(200).json(maintenance);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /maintenances:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new maintenance record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               description:
 *                 type: string
 *               cost:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date-time
 *               duration:
 *                 type: number
 *     responses:
 *       201:
 *         description: The created maintenance record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 */
maintenanceRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const maintenance = <MaintenanceInput>req.body;
        const result = await maintenanceService.createMaintenance(maintenance);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

export { maintenanceRouter };
