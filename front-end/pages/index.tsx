import React, { useEffect, useState } from 'react';
import GarageService from '../services/GarageService';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

const HomePage: React.FC = () => {
    const { t } = useTranslation('common');
    const [garages, setGarages] = useState<{ id: number; name: string; size: number; place: string; cars: any[] }[]>([]);

    useEffect(() => {
        const fetchGarages = async () => {
            try {
                const allGarages = await GarageService.getAllGarages();
                const sortedGarages = allGarages
                    .sort((a: any, b: any) => b.cars.length - a.cars.length) // Sort by the number of cars
                    .slice(0, 3);
                setGarages(sortedGarages);
            } catch (error) {
                console.error(t('general.error'), error);
            }
        };
        fetchGarages();
    }, [t]);

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-80"></div>
                <img
                    src="/images/hero.png"
                    alt={t('home.hero.backgroundAlt')}
                    className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('home.hero.title')}</h1>
                    <p className="text-lg md:text-2xl mb-6">{t('home.hero.subtitle')}</p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="flex justify-around text-center py-8">
                <div>
                    <h2 className="text-3xl font-bold">50+</h2>
                    <p>{t('home.stats.locations')}</p>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">10K+</h2>
                    <p>{t('home.stats.carsServiced')}</p>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">5</h2>
                    <p>{t('home.stats.years')}</p>
                </div>
            </section>

            {/* Top Garages Section */}
            <section className="px-8 py-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('home.garages.title')}</h2>
                <p className="mb-6 text-gray-300">{t('home.garages.description')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {garages.length > 0 ? (
                        garages.map((garage) => (
                            <Link href={`/garages/${garage.id}`} key={garage.id}>
                                <div className="bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                                    <h3 className="text-xl font-semibold mb-2">{garage.name}</h3>
                                    <p className="text-gray-300 mb-2">{t('home.garages.size')}: {garage.size}</p>
                                    <p className="text-gray-300 mb-2">{t('home.garages.place')}: {garage.place}</p>
                                    <p className="text-gray-300">{t('home.garages.cars')}: {garage.cars.length}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center col-span-3">{t('home.garages.noAvailable')}</p>
                    )}
                </div>
            </section>

            {/* User Table Section */}
            <section className="px-8 py-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('home.userTable.title')}</h2>
                <table className="min-w-full bg-gray-800 text-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-700 text-left">
                            <th className="px-4 py-2">{t('home.userTable.username')}</th>
                            <th className="px-4 py-2">{t('home.userTable.password')}</th>
                            <th className="px-4 py-2">{t('home.userTable.role')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-600">
                            <td className="px-4 py-2">johndoe</td>
                            <td className="px-4 py-2">password123</td>
                            <td className="px-4 py-2">customer</td>
                        </tr>
                        <tr className="border-b border-gray-600">
                            <td className="px-4 py-2">janedoe</td>
                            <td className="px-4 py-2">securepass</td>
                            <td className="px-4 py-2">employee</td>
                        </tr>
                        <tr className="border-b border-gray-600">
                            <td className="px-4 py-2">admin</td>
                            <td className="px-4 py-2">adminpass</td>
                            <td className="px-4 py-2">admin</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Values Section */}
            <section className="bg-gray-800 text-white py-10 px-8 rounded-lg shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('home.values.title')}</h2>
                <p className="mb-6 text-gray-300">{t('home.values.description')}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                    <li>{t('home.values.point1')}</li>
                    <li>{t('home.values.point2')}</li>
                    <li>{t('home.values.point3')}</li>
                </ul>
            </section>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
});

export default HomePage;
