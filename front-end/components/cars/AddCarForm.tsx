import React, { useState, useEffect } from 'react';
import { CarInput } from '../../types';
import GarageService from '../../services/GarageService';
import CarService from '../../services/CarService';

interface AddCarFormProps {
    onClose: () => void;
    onAdd: (newCar: CarInput) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onClose, onAdd }) => {
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [electric, setElectric] = useState(false);
    const [garageId, setGarageId] = useState<number | ''>('');
    const [garages, setGarages] = useState<{ id: number; name: string; size: number; place: string }[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGarages = async () => {
            try {
                const allGarages = await GarageService.getAllGarages();
                setGarages(allGarages);
            } catch (err) {
                console.error('Error fetching garages:', err);
                setError('Failed to fetch garages.');
            }
        };

        fetchGarages();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!brand || !color || !garageId) {
            setError('All fields are required.');
            return;
        }

        try {
            const newCar: CarInput = {
                brand,
                color,
                electric,
                garageId: Number(garageId),
            };
            const addedCar = await CarService.addCar(newCar);
            onAdd(addedCar);
            onClose();
        } catch (err) {
            console.error('Error adding car:', err);
            setError('Failed to add car. Please try again.');
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Add a New Car</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Brand</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Color</label>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        checked={electric}
                        onChange={() => setElectric(!electric)}
                        className="mr-2"
                    />
                    <label className="text-gray-300">Electric</label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Garage</label>
                    <select
                        value={garageId}
                        onChange={(e) => setGarageId(Number(e.target.value))}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a Garage</option>
                        {garages.map((garage) => (
                            <option key={garage.id} value={garage.id}>
                                {`${garage.name} - Size: ${garage.size} - Place: ${garage.place}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add Car
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCarForm;
