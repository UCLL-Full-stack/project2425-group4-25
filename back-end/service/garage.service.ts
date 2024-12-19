import garageDB from '../repository/garage.db';
import { Garage } from '../model/garage';
import { GarageInput } from '../types';

const getAllGarages = async (): Promise<Garage[]> => {
    return garageDB.getAllGarages();
};

const getGarageById = async (id: number): Promise<Garage> => {
    const garage = await garageDB.getGarageById({ id });
    if (!garage) throw new Error(`Garage with id ${id} does not exist.`);
    return garage;
};

const createGarage = async ({name , size , place }: GarageInput): Promise<Garage> => {
    return garageDB.createGarage(new Garage({ name, size, place, cars: [] }));
};

export default {
    getAllGarages,
    getGarageById,
    createGarage,
};