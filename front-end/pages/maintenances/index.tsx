import React, { useState } from "react";
import useSWR from "swr";
import MaintenanceOverviewTable from "../../components/maintenances/MaintenanceOverviewTable";
import AddMaintenanceForm from "../../components/maintenances/AddMaintenanceForm";
import MaintenanceService from "../../services/MaintenanceService";
import { MaintenanceInput } from "../../types";

const fetcher = async () => {
    try {
        const maintenances = await MaintenanceService.getAllMaintenances();
        return maintenances;
    } catch (error) {
        console.error("Error fetching maintenances:", error);
        throw error;
    }
};

const MaintenancesPage: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { data: maintenances, mutate, error } = useSWR("/maintenances", fetcher, { revalidateOnFocus: false });

    const handleAddMaintenance = async (newMaintenance: MaintenanceInput) => {
        try {
            const addedMaintenance = await MaintenanceService.addMaintenance(newMaintenance);

            // Update SWR cache directly to prevent re-fetching and duplicates
            mutate((cachedMaintenances: any) => [...(cachedMaintenances || []), addedMaintenance], false);

            setIsFormVisible(false); // Close the form
        } catch (error) {
            console.error("Error adding maintenance:", error);
        }
    };

    if (error) {
        return <div className="text-red-500">Failed to load maintenances.</div>;
    }

    if (!maintenances) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-6">Maintenances Overview</h1>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
                onClick={() => setIsFormVisible(true)}
            >
                Add a Maintenance
            </button>

            {isFormVisible && (
                <AddMaintenanceForm onClose={() => setIsFormVisible(false)} onAdd={handleAddMaintenance} />
            )}

            <MaintenanceOverviewTable maintenances={maintenances} />
        </div>
    );
};

export default MaintenancesPage;
