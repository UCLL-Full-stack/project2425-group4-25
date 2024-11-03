import { Car } from "../model/car";
import CarRepository from "../repository/car.db";

const getAllCars = (): Car[] => {
    const cars = CarRepository.getCars();
    if (cars.length === 0) {
        throw new Error("No cars found");
    }
    return cars;
};

const createCar = (id: number, color: string, electric: boolean, brand: string): Car => {
    const newCar = new Car(id, color, electric, brand);
    return CarRepository.addCar(newCar);
};

export default { getAllCars, createCar };
