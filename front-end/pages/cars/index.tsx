import React, { useState } from 'react';
import useSWR from 'swr';
import CarOverviewTable from '../../components/cars/CarOverviewTable';
import AddCarForm from '../../components/cars/AddCarForm';
import CarService from '../../services/CarService';
import { CarInput } from '../../types';

const fetcher = async () => {
    try {
        const cars = await CarService.getAllCars();
        return cars;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};

const CarsPage: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { data: cars, mutate, error } = useSWR('/cars', fetcher, { revalidateOnFocus: false });

    const handleAddCar = async (newCar: CarInput) => {
        try {
            const addedCar = await CarService.addCar(newCar);

            // Update SWR cache directly to prevent re-fetching and duplicates
            mutate((cachedCars: any) => [...(cachedCars || []), addedCar], false);

            setIsFormVisible(false); // Close the form
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    if (error) {
        return <div className="text-red-500">Failed to load cars.</div>;
    }

    if (!cars) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-6">Cars Overview</h1>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
                onClick={() => setIsFormVisible(true)}
            >
                Add a Car
            </button>

            {isFormVisible && (
                <AddCarForm onClose={() => setIsFormVisible(false)} onAdd={handleAddCar} />
            )}

            <CarOverviewTable cars={cars} />
        </div>
    );
};

export default CarsPage;