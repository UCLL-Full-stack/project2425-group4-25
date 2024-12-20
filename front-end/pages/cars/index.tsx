import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import CarOverviewTable from '../../components/cars/CarOverviewTable';
import AddCarForm from '../../components/cars/AddCarForm';
import CarService from '../../services/CarService';
import { CarInput } from '../../types';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const fetcher = async () => {
    try {
        const cars = await CarService.getAllCars();
        return cars;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};

const CarsPage: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { data: cars, mutate, error } = useSWR('/cars', fetcher, { revalidateOnFocus: false });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true);
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

    const handleAddCar = async (newCar: CarInput) => {
        try {
            const addedCar = await CarService.addCar(newCar); // Make the POST request here
    
            // Update SWR cache safely
            mutate((cachedCars: CarInput[] | undefined) => {
                if (cachedCars) {
                    return [...cachedCars, addedCar];
                }
                return [addedCar];
            }, false);
    
            setIsFormVisible(false); // Close the form
        } catch (error) {
            console.error('Error adding car:', error);
        }
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
});

export default CarsPage;