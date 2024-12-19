import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MaintenanceService from '../../services/MaintenanceService';
import { Maintenance } from '../../types';

const MaintenanceDetails: React.FC = () => {
    const [maintenance, setMaintenance] = useState<Maintenance | null>(null);
    const router = useRouter();
    const { maintenanceId } = router.query;

    useEffect(() => {
        if (maintenanceId) {
            const fetchMaintenanceDetails = async () => {
                try {
                    const data = await MaintenanceService.getMaintenanceById(maintenanceId as string);
                    setMaintenance(data);
                } catch (error) {
                    console.error('Error fetching maintenance details:', error);
                }
            };
            fetchMaintenanceDetails();
        }
    }, [maintenanceId]);

    if (!maintenance) {
        return <p className="text-white">Loading maintenance details...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h2 className="text-4xl font-bold mb-6">Maintenance Details</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <p><strong>ID:</strong> {maintenance.id}</p>
                <p><strong>Type:</strong> {maintenance.type}</p>
                <p><strong>Description:</strong> {maintenance.description}</p>
                <p><strong>Cost:</strong> ${maintenance.cost}</p>
                <p><strong>Date:</strong> {new Date(maintenance.date).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {maintenance.duration} hrs</p>
            </div>

            <h3 className="text-2xl font-bold mb-4">Car Information</h3>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                {maintenance.cars.length > 0 ? (
                    maintenance.cars.map((car) => (
                        <div key={car.id} className="mb-4">
                            <p><strong>ID:</strong> {car.id}</p>
                            <p><strong>Brand:</strong> {car.brand}</p>
                            <p><strong>Color:</strong> {car.color}</p>
                            <p><strong>Electric:</strong> {car.electric ? 'Yes' : 'No'}</p>
                        </div>
                    ))
                ) : (
                    <p>No car information available for this maintenance.</p>
                )}
            </div>
        </div>
    );
};

export default MaintenanceDetails;
