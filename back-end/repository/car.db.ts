import database from '../util/database';
import { Car } from '../model/car';
import { CarInput } from '../types';

const createCar = async ({ color, electric, brand, garageId, userId }: CarInput): Promise<Car> => {
    try {
        const carPrisma = await database.car.create({
            data: {
                color,
                electric,
                brand,
                garage: {
                    connect: { id: garageId },
                },
                user: {
                    connect: { id: userId },
                },
            },
            include: {
                maintenances: {
                    include: { maintenance: true },
                },
                user: true,
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

const updateCar = async (
    id: number,
    { color, electric, brand, garageId }: Partial<CarInput>
): Promise<Car | null> => {
    try {
        const carPrisma = await database.car.update({
            where: { id },
            data: {
                color,
                electric,
                brand,
                garage: garageId ? { connect: { id: garageId } } : undefined,
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
        if (error.code === 'P2025') {
            // Prisma-specific error code for "Record not found"
            throw new Error(`Car with ID ${id} not found.`);
        }
        throw new Error('Database error. See server log for details.');
    }
};

const deleteCar = async (id: number): Promise<boolean> => {
    try {
        await database.car.delete({
            where: { id },
        });
        return true;
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            // Prisma-specific error code for "Record not found"
            throw new Error(`Car with ID ${id} not found.`);
        }
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createCar,
    getCarById,
    getAllCars,
    updateCar,
    deleteCar,
};
