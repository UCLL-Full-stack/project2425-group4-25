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

const createCar = async ({ color, electric, brand, garageId }: CarInput): Promise<Car> => {
    return carDB.createCar({ color, electric, brand, garageId });
};

const updateCar = async (
    id: number,
    { color, electric, brand, garageId }: Partial<CarInput>
): Promise<Car> => {
    const car = await carDB.updateCar(id, { color, electric, brand, garageId });
    if (!car) throw new Error(`Failed to update car with id ${id}.`);
    return car;
};

const deleteCar = async (id: number): Promise<void> => {
    const success = await carDB.deleteCar(id);
    if (!success) throw new Error(`Failed to delete car with id ${id}.`);
};

export default {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
};
