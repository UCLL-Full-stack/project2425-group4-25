import maintenanceDB from '../repository/maintenance.db';
import { Maintenance } from '../model/maintenance';
import { MaintenanceInput } from '../types';

const getAllMaintenances = async (): Promise<Maintenance[]> => {
    return maintenanceDB.getAllMaintenances();
};

const getMaintenanceById = async (id: number): Promise<Maintenance> => {
    const maintenance = await maintenanceDB.getMaintenanceById({ id });
    if (!maintenance) throw new Error(`Maintenance with id ${id} does not exist.`);
    return maintenance;
};

const createMaintenance = async (
    { type, description, cost, date, duration }: MaintenanceInput
): Promise<Maintenance> => {
    return maintenanceDB.createMaintenance(
        new Maintenance({ type, description, cost, date, duration, cars: [] })
    );
};

const updateMaintenance = async (
    id: number,
    updates: Partial<MaintenanceInput>
): Promise<Maintenance> => {
    const updatedMaintenance = await maintenanceDB.updateMaintenance(id, updates);
    if (!updatedMaintenance) throw new Error(`Failed to update maintenance with id ${id}.`);
    return updatedMaintenance;
};

const deleteMaintenance = async (id: number): Promise<void> => {
    const success = await maintenanceDB.deleteMaintenance(id);
    if (!success) throw new Error(`Failed to delete maintenance with id ${id}.`);
};

export default {
    getAllMaintenances,
    getMaintenanceById,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
};
