import database from '../util/database';
import { Garage } from '../model/garage';

const createGarage = async ({name, size, place, cars}: Garage): Promise<Garage> => {
    try {
        const garagePrisma = await database.garage.create({
            data: {
                name: name,
                size: size,
                place: place,
                cars: {
                    connect: cars.map((car) => ({ id: car.id }))
                }
            },
            include: {
                cars: {
                    include: {
                        maintenances: {
                            include: { maintenance: true }
                        }
                    }
                }
            }
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
                            include: { maintenance: true }
                        }
                    }
                }
            }
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
                            include: { maintenance: true }
                        }
                    }
                }
            }
        });
        return garagesPrisma.map((g) => Garage.from(g));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createGarage,
    getGarageById,
    getAllGarages,
};
