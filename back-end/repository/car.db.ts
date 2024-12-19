import database from '../util/database';
import { Car } from '../model/car';
import { CarInput } from '../types';

const createCar = async ({ color, electric, brand, garageId }: CarInput): Promise<Car> => {
    try {
        const carPrisma = await database.car.create({
            data: {
                color,
                electric,
                brand,
                garage: {
                    connect: { id: garageId },
                },
            },
            include: {
                maintenances: {
                    include: { maintenance: true },
                },
            },
        });
        return Car.from(carPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCarById = async ({ id }: { id: number }): Promise<Car | null> => {
    try {
        const carPrisma = await database.car.findUnique({
            where: { id },
            include: {
                maintenances: {
                    include: { maintenance: true }
                }
            }
        });
        return carPrisma ? Car.from(carPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllCars = async (): Promise<Car[]> => {
    try {
        const carsPrisma = await database.car.findMany({
            include: {
                maintenances: {
                    include: { maintenance: true }
                }
            }
        });
        return carsPrisma.map((carPrisma) => Car.from(carPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createCar,
    getCarById,
    getAllCars,
};
