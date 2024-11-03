import { Car } from "../model/car";
import CarRepository from "../repository/car.db";

const validateCarData = (color: string, electric: boolean, brand: string): void => {
    if (typeof brand !== 'string' || brand.trim() === '') {
        throw new Error('Invalid brand. Brand must be a non-empty string.');
    }
    if (typeof electric !== 'boolean') {
        throw new Error('Invalid electric field. Must be a boolean.');
    }
    if (typeof color !== 'string' || color.trim() === '') {
        throw new Error('Invalid color. Color must be a non-empty string.');
    }
};

const getAllCars = (): Car[] => {
    const cars = CarRepository.getCars();
    if (cars.length === 0) {
        throw new Error("No cars found");
    }
    return cars;
};

const getCarById = (id: number): Car => {
    const car = CarRepository.getCarById(id);
    if (!car) {
        throw new Error(`Car with ID ${id} not found`);
    }
    return car;
};

const createCar = (color: string, electric: boolean, brand: string): Car => {
    validateCarData(color, electric, brand); // Call the validation function

    const newCar = new Car(color, electric, brand);
    return CarRepository.addCar(newCar);
};

export default { getAllCars, getCarById, createCar };
