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
 *                 type: integer
 *     responses:
 *       201:
 *         description: The created car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid input or garage not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Garage with id 1 does not exist."
 *       409:
 *         description: Garage is full.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Garage with id 1 is full."
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

garageRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const garage = <GarageInput>req.body;
        const result = await garageService.createGarage(garage);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /garages/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update an existing garage by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The garage id.
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
 *               cars:
 *                 type: array
 *                 items:
 *                   type: number
 *                   description: Car IDs to associate with the garage.
 *     responses:
 *       200:
 *         description: The updated garage.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garage'
 *       404:
 *         description: Garage not found.
 */
garageRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const updates = req.body;
        const updatedGarage = await garageService.updateGarage(id, updates);
        res.status(200).json(updatedGarage);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /garages/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a garage by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The garage id.
 *     responses:
 *       200:
 *         description: Garage successfully deleted.
 *       404:
 *         description: Garage not found.
 */
garageRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await garageService.deleteGarage(id);
        res.status(200).send({ message: `Garage with ID ${id} has been deleted.` });
    } catch (error) {
        next(error);
    }
});


export { garageRouter };
