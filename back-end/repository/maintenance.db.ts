import { Maintenance } from "../model/maintenance";
import { Car } from "../model/car";

// Initialize with empty arrays to avoid direct imports that create circular dependencies
const maintenances: Maintenance[] = [
    new Maintenance(1, "Oil Change", "Routine oil change", 50, new Date('2023-06-01'), 1),
    new Maintenance(2, "Tire Replacement", "Replaced all four tires", 400, new Date('2023-07-15'), 3),
    new Maintenance(3, "Brake Pad Replacement", "Replaced front brake pads", 150, new Date('2023-08-20'), 2),
];

export const getMaintenances = (): Maintenance[] => {
    return maintenances;
};

export const getMaintenancesByCarId = (carId: number): Maintenance[] => {
    return maintenances.filter(m => m.getCars().some(c => c.getId() === carId));
};

export const addMaintenance = (maintenance: Maintenance): Maintenance => {
    maintenances.push(maintenance);
    return maintenance;
};

export default {
    getMaintenances,
    getMaintenancesByCarId,
    addMaintenance,
};
