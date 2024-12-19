import React, { useState } from "react";
import { GarageInput } from "@types";
import GarageService from "../../services/GarageService";

interface AddGarageFormProps {
    onClose: () => void;
    onAdd: (newGarage: GarageInput) => void;
}

const AddGarageForm: React.FC<AddGarageFormProps> = ({ onClose, onAdd }) => {
    const [name, setName] = useState("");
    const [size, setSize] = useState<number | "">("");
    const [place, setPlace] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !size || !place) {
            setError("All fields are required.");
            return;
        }

        const newGarage: GarageInput = {
            name,
            size: Number(size),
            place,
        };

        try {
            const addedGarage = await GarageService.addGarage(newGarage);
            onAdd(addedGarage);
            onClose();
        } catch (err) {
            console.error("Error adding garage:", err);
            setError("Failed to add garage. Please try again.");
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Add a New Garage</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Size</label>
                    <input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(e.target.value ? Number(e.target.value) : "")}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Place</label>
                    <input
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                        Add Garage
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddGarageForm;
