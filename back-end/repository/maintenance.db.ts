import database from '../util/database';
import { Maintenance } from '../model/maintenance';

const createMaintenance = async ({ type, description, cost, date, duration }: Maintenance): Promise<Maintenance> => {
    try {
        const maintenancePrisma = await database.maintenance.create({
            data: {
                type: type,
                description: description,
                cost: cost,
                date: date,
                duration: duration,
            },
            include: {
                cars: { include: { car: true } }
            }
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
                cars: { include: { car: true } }
            }
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
                cars: { include: { car: true } }
            }
        });
        return maintenancesPrisma.map((m) => Maintenance.from(m));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createMaintenance,
    getMaintenanceById,
    getAllMaintenances,
};
