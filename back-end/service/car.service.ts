import { Car } from "../model/car";
import CarRepository from "../repository/car.db";

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

const createCar = (id: number, color: string, electric: boolean, brand: string): Car => {
    const newCar = new Car(id, color, electric, brand);
    return CarRepository.addCar(newCar);
};

export default { getAllCars, getCarById, createCar };
