import express, { Request, Response, NextFunction } from 'express';
import carService from '../service/car.service';

const carRouter = express.Router();

/**
 * @swagger
 * /cars:
 *  get:
 *      summary: Get a list of all cars
 *      description: Returns a JSON array of cars, each item in the array is an object that represents a car with details.
 *      responses:
 *         200:
 *           description: A JSON array of cars
 *           content:
 *             application/json:
 *              schema:
 *                type: array
 *                items:
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
 *      summary: Get car by ID
 *      description: Returns details of a specific car by ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: The car ID
 *      responses:
 *         200:
 *           description: Car details returned successfully
 *         404:
 *           description: Car not found
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
 *  post:
 *      summary: Create a new car
 *      description: Adds a new car to the list
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                brand:
 *                  type: string
 *                electric:
 *                  type: boolean
 *                color:
 *                  type: string
 *      responses:
 *         201:
 *           description: Car created successfully
 *         400:
 *           description: Invalid input data
 */
carRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const { brand, electric, color } = req.body;
        if (!brand || typeof electric !== 'boolean' || !color) {
            res.status(400).json({ message: 'Invalid input data' });
            return;
        }
        const newCar = carService.createCar(color, electric, brand);
        res.status(201).json(newCar);
    } catch (error) {
        next(error);
    }
});


export { carRouter };
