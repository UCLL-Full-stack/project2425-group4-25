/**
 * @swagger
 *   components:
 *    schemas:
 *      Garage:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *            size:
 *              type: number
 *              format: int64
 *            place:
 *              type: string
 *            cars:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Car'
 */

import express, { NextFunction, Request, Response } from 'express';
import garageService from '../service/garage.service';
import { GarageInput } from '../types';

const garageRouter = express.Router();

/**
 * @swagger
 * /garages:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all garages.
 *     responses:
 *       200:
 *         description: A list of garages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Garage'
 */
garageRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const garages = await garageService.getAllGarages();
        res.status(200).json(garages);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /garages/{id}:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Get a garage by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The garage id.
 *      responses:
 *          200:
 *              description: A garage object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Garage'
 */
garageRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const garage = await garageService.getGarageById(Number(req.params.id));
        res.status(200).json(garage);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /garages:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new garage.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               size:
 *                 type: number
 *               place:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created garage.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garage'
 */
garageRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const garage = <GarageInput>req.body;
        const result = await garageService.createGarage(garage);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

export { garageRouter };
