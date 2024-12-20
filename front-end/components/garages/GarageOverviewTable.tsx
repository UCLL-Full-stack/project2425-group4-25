import React from 'react';
import { Garage } from '../../types';
import Link from 'next/link';
import GarageService from '../../services/GarageService'; // Import the GarageService

interface GarageOverviewTableProps {
    garages: Garage[] | undefined; // Handle undefined garages
    onDelete: (garageId: number) => void; // Callback for deleting a garage
}

const GarageOverviewTable: React.FC<GarageOverviewTableProps> = ({ garages, onDelete }) => {
    if (!garages || garages.length === 0) {
        return (
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Garage Overview</h2>
                <p className="text-gray-400">No garages available.</p>
            </div>
        );
    }

    const handleDelete = async (garageId: number) => {
        const confirmDelete = confirm('Are you sure you want to delete this garage?');
        if (!confirmDelete) return;

        try {
            await GarageService.deleteGarage(String(garageId)); // Call the delete API
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Error deleting garage:', error);
            alert('Failed to delete the garage. Please try again.');
        }
    };

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
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {garages.map((garage) => (
                            <tr key={garage.id} className="hover:bg-gray-700 border-b border-gray-600">
                                <td className="px-4 py-2">{garage.id}</td>
                                <td className="px-4 py-2">{garage.name}</td>
                                <td className="px-4 py-2">{garage.size}</td>
                                <td className="px-4 py-2">{garage.place}</td>
                                <td className="px-4 py-2">    
                                    <Link href={`/garages/${garage.id}`} className="bg-blue-500 hover:underline rounded-sm px-2 py-1">
                                        Details
                                    </Link>
                                    <button
                                        className="bg-red-500 ml-2 hover:underline rounded-sm px-2 py-1"
                                        onClick={() => garage.id !== undefined && handleDelete(garage.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GarageOverviewTable;