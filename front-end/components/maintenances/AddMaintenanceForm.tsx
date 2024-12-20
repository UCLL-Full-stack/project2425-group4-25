import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
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
    const [availableCars, setAvailableCars] = useState<{ id: number; brand: string; color: string }[]>([]);
    const [selectedCars, setSelectedCars] = useState<{ id: number; brand: string; color: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const allCars = await CarService.getAllCars();
                setAvailableCars(allCars);
            } catch (err) {
                console.error("Error fetching cars:", err);
                setError("Failed to fetch cars.");
            }
        };

        fetchCars();
    }, []);

    const validate = (): boolean => {
        if (!type || !description || !cost || !date || !duration || selectedCars.length === 0) {
            setError("All fields are required, and at least one car must be selected.");
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
        const formattedDate = new Date(date).toISOString();
        const newMaintenance: MaintenanceInput = {
            type,
            description,
            cost: Number(cost),
            date: formattedDate,
            duration: Number(duration),
            carIds: selectedCars.map((car) => car.id),
        };

        onAdd(newMaintenance); // Pass the new maintenance data to the parent
        onClose(); // Close the form
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) return;

        if (source.droppableId === "availableCars" && destination.droppableId === "selectedCars") {
            const movedCar = availableCars[source.index];
            setAvailableCars((prev) => prev.filter((_, idx) => idx !== source.index));
            setSelectedCars((prev) => [...prev, movedCar]);
        }

        if (source.droppableId === "selectedCars" && destination.droppableId === "availableCars") {
            const movedCar = selectedCars[source.index];
            setSelectedCars((prev) => prev.filter((_, idx) => idx !== source.index));
            setAvailableCars((prev) => [...prev, movedCar]);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Add Maintenance</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-300 mb-2">Type</label>
                        <input
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-gray-300 mb-2">Cost</label>
                        <input
                            type="number"
                            value={cost}
                            onChange={(e) => setCost(e.target.value ? Number(e.target.value) : "")}
                            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-gray-300 mb-2">Duration (hours)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : "")}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Drag and Drop Components */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="selectedCars">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="bg-gray-700 p-4 rounded border border-gray-600"
                                >
                                    <h3 className="text-white mb-2">Selected Cars</h3>
                                    {selectedCars.map((car, index) => (
                                        <Draggable key={car.id} draggableId={`selected-${car.id}`} index={index}>
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    className="bg-gray-800 p-2 rounded mb-2 text-white"
                                                >
                                                    {`${car.brand} - ${car.color}`}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="availableCars">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="bg-gray-700 p-4 rounded border border-gray-600"
                                >
                                    <h3 className="text-white mb-2">Available Cars</h3>
                                    {availableCars.map((car, index) => (
                                        <Draggable key={car.id} draggableId={`available-${car.id}`} index={index}>
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    className="bg-gray-800 p-2 rounded mb-2 text-white"
                                                >
                                                    {`${car.brand} - ${car.color}`}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
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
