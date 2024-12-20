import React, { useEffect, useState } from "react";
import CarService from "../../services/CarService";
import { MaintenanceInput } from "../../types";

interface AddMaintenanceFormProps {
    onClose: () => void;
    onAdd: (newMaintenance: MaintenanceInput) => void;
}

const AddMaintenanceForm: React.FC<AddMaintenanceFormProps> = ({ onClose, onAdd }) => {
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState<number | "">("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState<number | "">("");
    const [carId, setCarId] = useState<number | "">("");
    const [cars, setCars] = useState<{ id: number; brand: string; color: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const allCars = await CarService.getAllCars();
                setCars(allCars);
            } catch (err) {
                console.error("Error fetching cars:", err);
                setError("Failed to fetch cars.");
            }
        };

        fetchCars();
    }, []);

    const validate = (): boolean => {
        if (!type || !description || !cost || !date || !duration || !carId) {
            setError("All fields are required.");
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        const newMaintenance: MaintenanceInput = {
            type,
            description,
            cost: Number(cost),
            date,
            duration: Number(duration),
            carId: Number(carId),
        };

        onAdd(newMaintenance); // Pass the new maintenance data to the parent
        onClose(); // Close the form
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Add Maintenance</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Cost</label>
                    <input
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value ? Number(e.target.value) : "")}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Duration (hours)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : "")}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Car</label>
                    <select
                        value={carId}
                        onChange={(e) => setCarId(Number(e.target.value))}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a Car</option>
                        {cars.map((car) => (
                            <option key={car.id} value={car.id}>
                                {`${car.brand} - ${car.color}`}
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
                        Add Maintenance
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMaintenanceForm;
