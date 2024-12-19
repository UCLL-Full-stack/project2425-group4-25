import React, { useEffect, useState } from 'react';
import GarageService from '../services/GarageService';
import Link from 'next/link';

const HomePage: React.FC = () => {
    const [garages, setGarages] = useState<{ id: number; name: string; size: number; place: string }[]>([]);

    useEffect(() => {
        const fetchGarages = async () => {
            try {
                const allGarages = await GarageService.getAllGarages();
                const sortedGarages = allGarages.sort((a: any, b: any) => b.size - a.size).slice(0, 3);
                setGarages(sortedGarages);
            } catch (error) {
                console.error('Error fetching garages:', error);
            }
        };
        fetchGarages();
    }, []);

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-80"></div>
                <img
                    src="/images/hero.png"
                    alt="Hero Background"
                    className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Comprehensive Car Maintenance</h1>
                    <p className="text-lg md:text-2xl mb-6">Expert maintenance and service at our locations across Europe</p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="flex justify-around text-center py-8">
                <div>
                    <h2 className="text-3xl font-bold">50+</h2>
                    <p>Locations Across Europe</p>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">10K+</h2>
                    <p>Cars Serviced</p>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">5</h2>
                    <p>Years of Excellence</p>
                </div>
            </section>

            {/* Top Garages Section */}
            <section className="px-8 py-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Most Popular Garages</h2>
                <p className="mb-6 text-gray-300">
                    We operate state-of-the-art garages in strategic locations to serve your needs efficiently.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {garages.length > 0 ? (
                        garages.map((garage) => (
                            <Link href={`/garages/${garage.id}`} key={garage.id}>
                                <div className="bg-white text-black rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                                    <h3 className="text-xl font-semibold mb-2">{garage.name}</h3>
                                    <p className="text-gray-700 mb-2">Size: {garage.size}</p>
                                    <p className="text-gray-700">Place: {garage.place}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center col-span-3">No garages available</p>
                    )}
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-white text-black py-10 px-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Us?</h2>
                <p className="mb-6">
                    At Banden Bekers-Bex, we provide exceptional maintenance services for all car models. Here's what sets us apart:
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Expert mechanics with years of experience</li>
                    <li>Comprehensive car services at competitive prices</li>
                    <li>Convenient locations across Europe</li>
                </ul>
            </section>
        </div>
    );
};

export default HomePage;
