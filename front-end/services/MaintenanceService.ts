import { MaintenanceInput } from "@types";

const getAllMaintenances = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maintenances`);
        if (!response.ok) {
            throw new Error("Failed to fetch maintenances");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching maintenances:", error);
        return [];
    }
}

const getMaintenanceById = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maintenances/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch maintenance by ID");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching maintenance by ID:", error);
        return null;
    }
}

const addMaintenance = async (maintenanceData: Partial<MaintenanceInput>): Promise<MaintenanceInput> => {
    try {
        const payload = {
            id: maintenanceData.id,
            type: maintenanceData.type,
            description: maintenanceData.description,
            cost: maintenanceData.cost,
            date: maintenanceData.date,
            duration: maintenanceData.duration,
            carId: maintenanceData.carId,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maintenances`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to add maintenance');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding maintenance:', error);
        throw error;
    }
}

const deleteMaintenance = async (maintenanceId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maintenances/${maintenanceId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete maintenance");
    }
};

const MaintenanceService = {
    getAllMaintenances,
    getMaintenanceById,
    addMaintenance,
    deleteMaintenance,
};

export default MaintenanceService;