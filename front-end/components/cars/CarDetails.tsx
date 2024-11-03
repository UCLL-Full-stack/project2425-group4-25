import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CarService from '../../services/CarService';
import { Car, Maintenance } from '../../types'; // Ensure you have these types defined

const CarDetails: React.FC = () => {
    const [car, setCar] = useState<Car | null>(null);
    const router = useRouter();
    const { carId } = router.query;

    useEffect(() => {
        if (carId) {
            const fetchCarDetails = async () => {
                try {
                    const carData = await CarService.getCarById(carId as string);
                    setCar(carData);
                } catch (error) {
                    console.error('Error fetching car details:', error);
                }
            };
            fetchCarDetails();
        }
    }, [carId]);

    if (!car) {
        return <p className="text-white">Loading car details...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h2 className="text-4xl font-bold mb-6">Car Details</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <p><strong>ID:</strong> {car.id}</p>
                <p><strong>Brand:</strong> {car.brand}</p>
                <p><strong>Color:</strong> {car.color}</p>
                <p><strong>Electric:</strong> {car.electric ? 'Yes' : 'No'}</p>
            </div>

            <h3 className="text-2xl font-bold mb-4">Maintenances</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-gray-800 text-gray-300 rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-700">
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Cost</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {car.maintenances.length > 0 ? (
                            car.maintenances.map((maintenance, index) => (
                                <tr key={index} className="hover:bg-gray-700 border-b border-gray-600">
                                    <td className="px-4 py-2">{maintenance.type}</td>
                                    <td className="px-4 py-2">{maintenance.description}</td>
                                    <td className="px-4 py-2">${maintenance.cost}</td>
                                    <td className="px-4 py-2">{new Date(maintenance.date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{maintenance.duration} hrs</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4">No maintenances available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CarDetails;
