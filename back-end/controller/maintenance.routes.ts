import express, { Request, Response, NextFunction } from 'express';
import maintenanceService from '../service/maintenance.service';
import { getCars } from '../repository/car.db';

const maintenanceRouter = express.Router();

/**
 * @swagger
 * /maintenances:
 *  get:
 *      summary: Get a list of all maintenance records
 *      description: Returns a JSON array of maintenance records, each item representing a maintenance entry with its details.
 *      responses:
 *         200:
 *           description: A JSON array of maintenance records
 *           content:
 *             application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Maintenance'
 */
maintenanceRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const maintenances = maintenanceService.getAllMaintenances();
        res.status(200).json(maintenances);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /maintenances:
 *  post:
 *      summary: Create a new maintenance record
 *      description: Adds a new maintenance record to the list
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                type:
 *                  type: string
 *                description:
 *                  type: string
 *                cost:
 *                  type: number
 *                date:
 *                  type: string
 *                  format: date
 *                duration:
 *                  type: number
 *                carId:
 *                  type: integer
 *      responses:
 *         201:
 *           description: Maintenance record created successfully
 *         400:
 *           description: Invalid input data
 */
maintenanceRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, type, description, cost, date, duration, carId } = req.body;
        const cars = getCars();
        const car = cars.find(c => c.getId() === carId);
        
        if (!id || !type || !description || !cost || !date || !duration || !car) {
            res.status(400).json({ message: 'Invalid input data' });
            return;
        }

        const newMaintenance = maintenanceService.createMaintenance(id, type, description, cost, new Date(date), duration, cars);
        res.status(201).json(newMaintenance);
    } catch (error) {
        next(error);
    }
});

export { maintenanceRouter };
