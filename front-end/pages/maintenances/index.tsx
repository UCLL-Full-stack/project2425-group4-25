import React, {useState, useEffect} from "react";
import MaintenanceOverviewtable from "../../components/maintenances/MaintenanceOverviewTable";
import AddMaintenanceForm from "../../components/maintenances/AddMaintenanceForm";
import MaintenanceService from "../../services/MaintenanceService";
import {MaintenanceInput} from "../../types";

const MaintenancesPage: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [maintenances, setMaintenances] = useState<MaintenanceInput[]>([]);

    const fetchMaintenances = async () => {
        try {
            const allMaintenances = await MaintenanceService.getAllMaintenances();
            setMaintenances(allMaintenances);
        } catch (error) {
            console.error('Error fetching maintenances:', error);
        }
    };

    useEffect(() => {
        fetchMaintenances();
    }, []);

    const handleAddMaintenance = (newMaintenance: MaintenanceInput) => {
        setMaintenances([...maintenances, newMaintenance]);
    };

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

            <MaintenanceOverviewtable maintenances={maintenances} />
        </div>
    );
};

export default MaintenancesPage;