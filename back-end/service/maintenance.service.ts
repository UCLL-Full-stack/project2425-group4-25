import { Maintenance } from "../model/maintenance";
import MaintenanceRepository from "../repository/maintenance.db";
import { Car } from "../model/car";

const getAllMaintenances = (): Maintenance[] => {
    const maintenances = MaintenanceRepository.getMaintenances();
    if (maintenances.length === 0) {
        throw new Error("No maintenances found");
    }
    return maintenances;
};

const getMaintenancesForCar = (carId: number): Maintenance[] => {
    const maintenances = MaintenanceRepository.getMaintenancesByCarId(carId);
    if (maintenances.length === 0) {
        throw new Error(`No maintenances found for car ID ${carId}`);
    }
    return maintenances;
};

const createMaintenance = (id: number, type: string, description: string, cost: number, date: Date, duration: number, cars: Car[]): Maintenance => {
    const newMaintenance = new Maintenance(id, type, description, cost, date, duration, cars);
    return MaintenanceRepository.addMaintenance(newMaintenance);
};

export default { getAllMaintenances, getMaintenancesForCar, createMaintenance };
