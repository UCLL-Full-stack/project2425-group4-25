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

const createGarage = async ({ name, size, place }: GarageInput): Promise<Garage> => {
    return garageDB.createGarage(new Garage({ name, size, place, cars: [] }));
};

const updateGarage = async (
    id: number,
    updates: Partial<GarageInput>
): Promise<Garage> => {
    const updatedGarage = await garageDB.updateGarage(id, updates);
    if (!updatedGarage) throw new Error(`Failed to update garage with id ${id}.`);
    return updatedGarage;
};

const deleteGarage = async (id: number): Promise<void> => {
    const success = await garageDB.deleteGarage(id);
    if (!success) throw new Error(`Failed to delete garage with id ${id}.`);
};

export default {
    getAllGarages,
    getGarageById,
    createGarage,
    updateGarage,
    deleteGarage,
};
