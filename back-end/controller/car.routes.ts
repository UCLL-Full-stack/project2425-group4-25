import express, {Request, Response, NextFunction} from 'express';
import carService from '../service/car.service';

const carRouter = express.Router();



/**
 * @swagger
 * /cars:
 *  get:
 *      summary: Get a list of all cars
 *      description: Returns a JSON array of cars, each item in the array is an object that represents a car, wich includes the car's id, make, model, and year.
 *      security:
 *       - bearerAuth: []
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
carRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars = carService.getCars();
        res.status(200).json(cars);
    } catch (error){
        next(error);
    }
});

export { carRouter };