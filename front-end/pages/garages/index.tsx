import React, { useState } from 'react';
import useSWR from 'swr';
import GarageOverviewTable from '../../components/garages/GarageOverviewTable';
import AddGarageForm from '../../components/garages/AddGarageForm';
import GarageService from '../../services/GarageService';
import { Garage, GarageInput } from '../../types';

const fetcher = async () => {
    try {
        const garages = await GarageService.getAllGarages();
        return garages;
    } catch (error) {
        console.error('Error fetching garages:', error);
        throw error;
    }
};

const GaragesPage: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { data: garages, mutate, error } = useSWR('/garages', fetcher, { revalidateOnFocus: false });

    const handleAddGarage = async (newGarageInput: GarageInput) => {
        try {
            const addedGarage = await GarageService.addGarage(newGarageInput);

            // Update SWR cache directly to prevent re-fetching and duplicates
            mutate((cachedGarages: any) => [...(cachedGarages || []), addedGarage], false);

            setIsFormVisible(false); // Close the form
        } catch (error) {
            console.error('Error adding garage:', error);
        }
    };

    if (error) {
        return <div className="text-red-500">Failed to load garages.</div>;
    }

    if (!garages) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-6">Garages Overview</h1>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
                onClick={() => setIsFormVisible(true)}
            >
                Add a Garage
            </button>

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
