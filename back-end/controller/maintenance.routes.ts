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
 *                 description: The type of maintenance.
 *               description:
 *                 type: string
 *                 description: A detailed description of the maintenance.
 *               cost:
 *                 type: number
 *                 description: The cost of the maintenance.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date the maintenance was performed.
 *               duration:
 *                 type: number
 *                 description: The duration of the maintenance in hours.
 *               carIds:
 *                 type: array
 *                 description: A list of IDs of cars associated with the maintenance.
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: The created maintenance record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 *       400:
 *         description: Invalid input or car not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid car ID."
 *       500:
 *         description: Database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database error. See server log for details."
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

/**
 * @swagger
 * /maintenances/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update an existing maintenance record by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The maintenance id.
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
 *               cars:
 *                 type: array
 *                 items:
 *                   type: number
 *                   description: Car IDs associated with the maintenance.
 *     responses:
 *       200:
 *         description: The updated maintenance record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 *       404:
 *         description: Maintenance not found.
 */
maintenanceRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const updates = req.body;
        const updatedMaintenance = await maintenanceService.updateMaintenance(id, updates);
        res.status(200).json(updatedMaintenance);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /maintenances/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a maintenance record by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The maintenance id.
 *     responses:
 *       200:
 *         description: Maintenance successfully deleted.
 *       404:
 *         description: Maintenance not found.
 */
maintenanceRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await maintenanceService.deleteMaintenance(id);
        res.status(200).send({ message: `Maintenance with ID ${id} has been deleted.` });
    } catch (error) {
        next(error);
    }
});


export { maintenanceRouter };
