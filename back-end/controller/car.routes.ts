/**
 * @swagger
 *   components:
 *    schemas:
 *      Car:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            color:
 *              type: string
 *            electric:
 *              type: boolean
 *            brand:
 *              type: string
 *            garageId:
 *              type: number
 *              format: int64
 *            maintenances:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Maintenance'
 */

import express, { NextFunction, Request, Response } from 'express';
import carService from '../service/car.service';
import { CarInput } from '../types';

const carRouter = express.Router();

/**
 * @swagger
 * /cars:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all cars.
 *     responses:
 *       200:
 *         description: A list of cars.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Car'
 */
carRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars = await carService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /cars/{id}:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Get a car by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The car id.
 *      responses:
 *          200:
 *              description: A car object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Car'
 */
carRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await carService.getCarById(Number(req.params.id));
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /cars:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               color:
 *                 type: string
 *               electric:
 *                 type: boolean
 *               brand:
 *                 type: string
 *               garageId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The created car.
 */
carRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { color, electric, brand, garageId, userId }: CarInput = req.body; 
        const car = await carService.createCar({ color, electric, brand, garageId, userId });
        res.status(201).json(car);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update an existing car by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The car id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               color:
 *                 type: string
 *               electric:
 *                 type: boolean
 *               brand:
 *                 type: string
 *               garageId:
 *                 type: number
 *                 format: int64
 *     responses:
 *       200:
 *         description: The updated car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found.
 */
carRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const updates = req.body;
        const updatedCar = await carService.updateCar(id, updates);
        res.status(200).json(updatedCar);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a car by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The car id.
 *     responses:
 *       200:
 *         description: Car successfully deleted.
 *       404:
 *         description: Car not found.
 */
carRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await carService.deleteCar(id);
        res.status(200).send({ message: `Car with ID ${id} has been deleted.` });
    } catch (error) {
        next(error);
    }
});


export { carRouter };
