import React from 'react';
import { Garage } from '../../types';

interface GarageOverviewTableProps {
    garages: Garage[] | undefined; // Handle undefined garages
}

const GarageOverviewTable: React.FC<GarageOverviewTableProps> = ({ garages }) => {
    if (!garages || garages.length === 0) {
        return (
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Garage Overview</h2>
                <p className="text-gray-400">No garages available.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Garage Overview</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-gray-800 text-gray-300 rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-700">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Size</th>
                            <th className="px-4 py-2">Place</th>
                        </tr>
                    </thead>
                    <tbody>
                        {garages.map((garage) => (
                            <tr key={garage.id} className="hover:bg-gray-700 border-b border-gray-600">
                                <td className="px-4 py-2">{garage.id}</td>
                                <td className="px-4 py-2">{garage.name}</td>
                                <td className="px-4 py-2">{garage.size}</td>
                                <td className="px-4 py-2">{garage.place}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GarageOverviewTable;
