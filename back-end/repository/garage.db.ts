import database from '../util/database';
import { Garage } from '../model/garage';

const createGarage = async ({ name, size, place, cars }: Garage): Promise<Garage> => {
    try {
        const garagePrisma = await database.garage.create({
            data: {
                name,
                size,
                place,
                cars: {
                    connect: cars.map((car) => ({ id: car.id })),
                },
            },
            include: {
                cars: {
                    include: {
                        maintenances: {
                            include: { maintenance: true },
                        },
                    },
                },
            },
        });
        return Garage.from(garagePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getGarageById = async ({ id }: { id: number }): Promise<Garage | null> => {
    try {
        const garagePrisma = await database.garage.findUnique({
            where: { id },
            include: {
                cars: {
                    include: {
                        maintenances: {
                            include: { maintenance: true },
                        },
                    },
                },
            },
        });
        return garagePrisma ? Garage.from(garagePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllGarages = async (): Promise<Garage[]> => {
    try {
        const garagesPrisma = await database.garage.findMany({
            include: {
                cars: {
                    include: {
                        maintenances: {
                            include: { maintenance: true },
                        },
                    },
                },
            },
        });
        return garagesPrisma.map((g) => Garage.from(g));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateGarage = async (
    id: number,
    { name, size, place, cars }: Partial<Garage>
): Promise<Garage | null> => {
    try {
        const garagePrisma = await database.garage.update({
            where: { id },
            data: {
                name,
                size,
                place,
                cars: cars
                    ? {
                          connect: cars.map((car) => ({ id: car.id })),
                      }
                    : undefined,
            },
            include: {
                cars: {
                    include: {
                        maintenances: {
                            include: { maintenance: true },
                        },
                    },
                },
            },
        });
        return Garage.from(garagePrisma);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            // Prisma-specific error code for "Record not found"
            throw new Error(`Garage with ID ${id} not found.`);
        }
        throw new Error('Database error. See server log for details.');
    }
};

const deleteGarage = async (id: number): Promise<boolean> => {
    try {
        const cars = await database.car.findMany({
            where: { garageId: id },
            select: { id: true },
        });
        const carIds = cars.map((car) => car.id);

        if (carIds.length > 0) {
            await database.car2Maintenance.deleteMany({
                where: {
                    carId: { in: carIds },
                },
            });

            
            await database.car.deleteMany({
                where: { garageId: id },
            });
        }

        await database.garage.delete({
            where: { id },
        });

        return true;
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            throw new Error(`Garage with ID ${id} not found.`);
        }
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    createGarage,
    getGarageById,
    getAllGarages,
    updateGarage,
    deleteGarage,
};
