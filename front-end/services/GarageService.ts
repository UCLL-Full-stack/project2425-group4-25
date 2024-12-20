import { GarageInput } from "@types";
import { get } from "http";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/garages`;

const getAllGarages = async () => {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch garages");
    }

    return await response.json(); // Return JSON response
};

const addGarage = async (garage: GarageInput) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(garage),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create garage");
    }

    return await response.json(); // Return JSON response
};

const getGarageById = async (garageId: string) => {
    const response = await fetch(`${API_URL}/${garageId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch garage details");
    }

    return await response.json(); // Return JSON response
};

const deleteGarage = async (garageId: string) => {
    const response = await fetch(`${API_URL}/${garageId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete garage");
    }
};


const GarageService = {
    getAllGarages,
    addGarage,
    getGarageById,
    deleteGarage,
};

export default GarageService;
