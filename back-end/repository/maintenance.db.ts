import database from '../util/database';
import { Maintenance } from '../model/maintenance';

const createMaintenance = async ({ type, description, cost, date, duration, carIds }:{
    type: string;
    description: string;
    cost: number;
    date: Date;
    duration: number;
    carIds: number[];}): Promise<Maintenance> => {
    try {
        const maintenancePrisma = await database.maintenance.create({
            data: {
                type,
                description,
                cost,
                date,
                duration,
                cars: {
                    create: carIds.map((carId) => ({ carId })),
            },
        },
        include: {
            cars: { include: { car: true } },
        },
    });
        return Maintenance.from(maintenancePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getMaintenanceById = async ({ id }: { id: number }): Promise<Maintenance | null> => {
    try {
        const maintenancePrisma = await database.maintenance.findUnique({
            where: { id },
            include: {
                cars: { include: { car: true } },
            },
        });
        return maintenancePrisma ? Maintenance.from(maintenancePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllMaintenances = async (): Promise<Maintenance[]> => {
    try {
        const maintenancesPrisma = await database.maintenance.findMany({
            include: {
                cars: { include: { car: true } },
            },
        });
        return maintenancesPrisma.map((m) => Maintenance.from(m));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateMaintenance = async (
    id: number,
    updates: Partial<Maintenance>
): Promise<Maintenance | null> => {
    try {
        const maintenancePrisma = await database.maintenance.update({
            where: { id },
            data: {
                type: updates.type,
                description: updates.description,
                cost: updates.cost,
                date: updates.date,
                duration: updates.duration,
                cars: updates.cars
                    ? {
                          connect: updates.cars.map((car) => ({
                              carId_maintenanceId: {
                                  carId: car.id!,
                                  maintenanceId: id,
                              },
                          })),
                      }
                    : undefined,
            },
            include: {
                cars: { include: { car: true } },
            },
        });
        return Maintenance.from(maintenancePrisma);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            // Prisma-specific error code for "Record not found"
            throw new Error(`Maintenance with ID ${id} not found.`);
        }
        throw new Error('Database error. See server log for details.');
    }
};


const deleteMaintenance = async (id: number): Promise<boolean> => {
    try {
        await database.maintenance.delete({
            where: { id },
        });
        return true;
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            // Prisma-specific error code for "Record not found"
            throw new Error(`Maintenance with ID ${id} not found.`);
        }
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createMaintenance,
    getMaintenanceById,
    getAllMaintenances,
    updateMaintenance,
    deleteMaintenance,
};
