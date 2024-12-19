import React, { useState, useEffect } from 'react';
import GarageOverviewTable from '../../components/garages/GarageOverviewTable';
import AddGarageForm from '../../components/garages/AddGarageForm';
import GarageService from '../../services/GarageService';
import { Garage, GarageInput } from '../../types';

const GaragesPage: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [garages, setGarages] = useState<Garage[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchGarages = async () => {
        try {
            const allGarages = await GarageService.getAllGarages();
            setGarages(allGarages);
        } catch (error) {
            console.error('Error fetching garages:', error);
        }
    };

    useEffect(() => {
        fetchGarages();

        // Check the user's role from session storage
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            try {
                const payloadBase64 = token.split('.')[1]; // Extract payload
                const decodedPayload = atob(payloadBase64); // Decode Base64
                const payload = JSON.parse(decodedPayload); // Parse JSON
                setIsAdmin(payload.role === 'admin'); // Check if role is admin
            } catch (error) {
                console.error('Failed to parse JWT token:', error);
            }
        }
    }, []);

    const handleAddGarage = async (newGarageInput: GarageInput) => {
        try {
            const addedGarage = await GarageService.addGarage(newGarageInput);
            // Add an empty cars array to match the Garage type expected by the table
            const updatedGarage: Garage = { ...addedGarage, cars: [] };
            setGarages([...garages, updatedGarage]);
        } catch (error) {
            console.error('Error adding garage:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-6">Garages Overview</h1>
            {isAdmin && (
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
                    onClick={() => setIsFormVisible(true)}
                >
                    Add a Garage
                </button>
            )}

            {isFormVisible && (
                <AddGarageForm
                    onClose={() => setIsFormVisible(false)}
                    onAdd={handleAddGarage}
                />
            )}

            <GarageOverviewTable garages={garages} />
        </div>
    );
};

export default GaragesPage;
