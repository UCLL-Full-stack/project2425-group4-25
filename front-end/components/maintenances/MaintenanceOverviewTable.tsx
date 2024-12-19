import React from 'react';
import { MaintenanceInput } from '../../types';
import router from 'next/router';


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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MaintenanceOverviewTable;