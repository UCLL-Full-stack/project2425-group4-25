import carDB from '../repository/car.db';
import { Car } from '../model/car';
import { CarInput } from '../types';

const getAllCars = async (): Promise<Car[]> => {
    return carDB.getAllCars();
};

const getCarById = async (id: number): Promise<Car> => {
    const car = await carDB.getCarById({ id });
    if (!car) throw new Error(`Car with id ${id} does not exist.`);
    return car;
};

const createCar = async ({color , electric , brand , garageId }: CarInput): Promise<Car> => {
    return carDB.createCar({ color, electric, brand, garageId });
};

export default {
    getAllCars,
    getCarById,
    createCar,
};
