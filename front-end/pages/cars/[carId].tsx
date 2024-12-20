import React, { useEffect, useState } from 'react';
import CarDetails from '../../components/cars/CarDetails';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CarService from '@services/CarService';

const CarDetailsPage: React.FC = () => {
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


    return <CarDetails />;
};
export const getStaticPaths: GetStaticPaths = async () => {
    const cars = await CarService.getAllCars();
    const paths = cars.map((car: { id: number }) => ({
        params: { carId: car.id.toString() },
    }));
    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
});

export default CarDetailsPage;
