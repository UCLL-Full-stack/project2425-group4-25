import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import GarageOverviewTable from '../../components/garages/GarageOverviewTable';
import AddGarageForm from '../../components/garages/AddGarageForm';
import GarageService from '../../services/GarageService';
import { Garage, GarageInput } from '../../types';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { data: garages, mutate, error } = useSWR('/garages', fetcher, { revalidateOnFocus: false });
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true);
            try {
                const payloadBase64 = token.split('.')[1]; // Extract payload
                const decodedPayload = atob(payloadBase64); // Decode Base64
                const payload = JSON.parse(decodedPayload); // Parse JSON
                setIsAdmin(payload.role === 'admin'); // Check if role is admin
            } catch (error) {
                console.error('Failed to parse JWT token:', error);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <h1 className="text-2xl font-bold">Please log in before visiting this page.</h1>
            </div>
        );
    }

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
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
});
export default GaragesPage;
