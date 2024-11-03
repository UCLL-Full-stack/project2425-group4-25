import React, { useState } from 'react';
import { CarInput } from '../../types';
import CarService from '../../services/CarService';

interface AddCarFormProps {
    onClose: () => void;
    onAdd: (newCar: CarInput) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onClose, onAdd }) => {
    const [carData, setCarData] = useState<Partial<CarInput>>({
        brand: '',
        color: '',
        electric: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setCarData({
            ...carData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newCar = await CarService.addCar(carData);
            onAdd(newCar);
            onClose();
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-2xl mb-4">Add a New Car</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            className="w-full border rounded p-2"
                            value={carData.brand || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Color</label>
                        <input
                            type="text"
                            name="color"
                            className="w-full border rounded p-2"
                            value={carData.color || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="electric"
                                className="mr-2"
                                checked={carData.electric || false}
                                onChange={handleChange}
                            />
                            Electric
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                            Add Car
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCarForm;
