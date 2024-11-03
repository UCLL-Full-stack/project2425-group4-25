import React, { useState, useEffect } from 'react';
import CarOverviewTable from '../../components/cars/CarOverviewTable';
import AddCarForm from '../../components/cars/AddCarForm';
import CarService from '../../services/CarService';
import { CarInput } from '../../types';

const CarsPage: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [cars, setCars] = useState<CarInput[]>([]);

    const fetchCars = async () => {
        try {
            const allCars = await CarService.getAllCars();
            setCars(allCars);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleAddCar = (newCar: CarInput) => {
        setCars([...cars, newCar]);
    };

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
