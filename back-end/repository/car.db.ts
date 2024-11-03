import { Car } from "../model/car";
import { getMaintenances } from "./maintenance.db";

const maintenances = getMaintenances();

const cars: Car[] = [
    new Car(1, "Red", false, "Toyota", [maintenances[0], maintenances[2]]),
    new Car(2, "Blue", true, "Tesla", [maintenances[1]]),
    new Car(3, "Black", false, "Ford"),
];

export const getCars = (): Car[] => {
    return cars;
};

export const getCarById = (id: number): Car | undefined => {
    return cars.find(car => car.getId() === id);
};

export const addCar = (car: Car): Car => {
    cars.push(car);
    return car;
};

export default {
    getCars,
    getCarById,
    addCar,
};
