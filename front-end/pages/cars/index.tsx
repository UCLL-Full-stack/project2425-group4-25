import React, { useState } from 'react';
import CarOverviewTable from '../../components/cars/CarOverviewTable';
import AddCarForm from '../../components/cars/AddCarForm';
import { CarInput } from '../../types';

const CarsPage: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [cars, setCars] = useState<CarInput[]>([]);

    const handleAddCar = (newCar: CarInput) => {
        setCars([...cars, newCar]);
    };

    return (
        <div className="px-8 py-10">
            <h1 className="text-3xl font-bold mb-4">Cars Overview</h1>
            <button
                className="bg-green-600 text-white px-4 py-2 rounded mb-4"
                onClick={() => setIsFormVisible(true)}
            >
                Add a Car
            </button>

            {isFormVisible && (
                <AddCarForm onClose={() => setIsFormVisible(false)} onAdd={handleAddCar} />
            )}

            <CarOverviewTable />
        </div>
    );
};

export default CarsPage;
