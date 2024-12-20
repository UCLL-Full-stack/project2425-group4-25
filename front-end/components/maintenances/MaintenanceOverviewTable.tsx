import React from 'react';
import { MaintenanceInput } from '../../types';
import router from 'next/router';
import Link from 'next/link';


interface MaintenanceOverviewTableProps {
    maintenances: MaintenanceInput[];
}

const MaintenanceOverviewTable: React.FC<MaintenanceOverviewTableProps> = ({ maintenances }) => {
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Maintenance Overview</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-gray-800 text-gray-300 rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-700">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Car ID</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Cost</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenances.map((maintenance) => (
                            <tr key={maintenance.id} className="hover:bg-gray-700 border-b border-gray-600" onClick={() => router.push(`/maintenances/${maintenance.id}`)}>
                                <td className="px-4 py-2">{maintenance.id}</td>
                                <td className="px-4 py-2">{maintenance.carId}</td>
                                <td className="px-4 py-2">{maintenance.date}</td>
                                <td className="px-4 py-2">{maintenance.description}</td>
                                <td className="px-4 py-2">{maintenance.cost}</td>
                                <td className="px-4 py-2">    
                                    <Link href={`/maintenances/${maintenance.id}`} className="bg-blue-500 hover:underline rounded-sm px-2 py-1">
                                        Details
                                    </Link>
                                    <button
                                        className="bg-red-500 ml-2 hover:underline rounded-sm px-2 py-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const confirmDelete = confirm('Are you sure you want to delete this maintenance?');
                                            if (confirmDelete){
                                                console.log('Delete maintenance with ID:', maintenance.id);
                                            }
                                        }}
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

export default MaintenanceOverviewTable;