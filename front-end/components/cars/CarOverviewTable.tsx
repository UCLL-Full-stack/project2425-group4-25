import React from 'react';
import Link from 'next/link';
import { CarInput } from '../../types';
import router from 'next/router';

interface CarOverviewTableProps {
    cars: CarInput[];
}

const CarOverviewTable: React.FC<CarOverviewTableProps> = ({ cars }) => {
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Car Overview</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-gray-800 text-gray-300 rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-700">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Brand</th>
                            <th className="px-4 py-2">Color</th>
                            <th className="px-4 py-2">Electric</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.id} className="hover:bg-gray-700 border-b border-gray-600" onClick={() => router.push(`/cars/${car.id}`)}>
                                <td className="px-4 py-2">{car.id}</td>
                                <td className="px-4 py-2">{car.brand}</td>
                                <td className="px-4 py-2">{car.color}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            car.electric ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                    >
                                        {car.electric ? 'Yes' : 'No'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CarOverviewTable;
