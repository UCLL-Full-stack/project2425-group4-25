import { Car } from "../model/car";
import { getMaintenances } from "./maintenance.db";

const maintenances = getMaintenances();
let carIdCounter = 4; // Starting ID for new cars (assuming initial cars already exist)

const cars: Car[] = [
    new Car("Red", false, "Toyota", [maintenances[0], maintenances[2]], 1),
    new Car("Blue", true, "Tesla", [maintenances[1]], 2),
    new Car("Black", false, "Ford", [], 3),
];

export const getCars = (): Car[] => {
    return cars;
};

export const getCarById = (id: number): Car | undefined => {
    return cars.find(car => car.getId() === id);
};

export const addCar = (car: Car): Car => {
    if (!car.getId()) {
        carIdCounter++;
        car = new Car(car.getColor(), car.isElectric(), car.getBrand(), car.getMaintenances(), carIdCounter);
    }
    cars.push(car);
    return car;
};

export default {
    getCars,
    getCarById,
    addCar,
};
