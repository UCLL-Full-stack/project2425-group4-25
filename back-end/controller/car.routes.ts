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
 *       - bearerAuth: []
 *     summary: Create a new car.
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
 *       201:
 *         description: The created car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 */
carRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = <CarInput>req.body;
        const result = await carService.createCar(car);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

export { carRouter };
