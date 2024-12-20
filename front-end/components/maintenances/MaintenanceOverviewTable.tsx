import React from 'react';
import { Maintenance } from '../../types';
import MaintenanceService from '@services/MaintenanceService';

interface MaintenanceOverviewTableProps {
    maintenances: Maintenance[];
    onDeleteSuccess: (id: number) => void;
}

const MaintenanceOverviewTable: React.FC<MaintenanceOverviewTableProps> = ({ maintenances, onDeleteSuccess }) => {
    const handleDelete = async (id: number) => {
        const confirmDelete = confirm('Are you sure you want to delete this maintenance?');
        if (confirmDelete) {
            try {
                await MaintenanceService.deleteMaintenance(String(id));
                onDeleteSuccess(id);
            } catch (error) {
                console.error('Error deleting maintenance:', error);
                alert('Failed to delete maintenance. Please try again.');
            }
        }
    };

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Maintenance Overview</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-gray-800 text-gray-300 rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-700">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Number of Cars</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Cost</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenances.map((maintenance) => (
                            <tr key={maintenance.id} className="hover:bg-gray-700 border-b border-gray-600">
                                <td className="px-4 py-2">{maintenance.id}</td>
                                <td className="px-4 py-2">{maintenance.cars?.length || 0}</td>
                                <td className="px-4 py-2">{new Date(maintenance.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{maintenance.description}</td>
                                <td className="px-4 py-2">{maintenance.cost}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => handleDelete(maintenance.id)}
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
