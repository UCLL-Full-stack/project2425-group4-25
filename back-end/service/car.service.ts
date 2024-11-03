import { Car } from "../model/car";
import CarRepository from "../repository/car.db";

const getCars = (): Car[] => {
    const cars = CarRepository.getCars();
    
    if (cars.length === 0) {
        throw new Error("No cars found");
    }
    return cars;
};

export default { getCars,};