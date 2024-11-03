import { CarInput } from '../types/index';


const getAllCars = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`);
        if (!response.ok) {
            throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cars:", error);
        return [];
    }
};

const getCarById = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch car by ID");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching car by ID:", error);
        return null;
    }
};

const addCar = async (carData: Partial<CarInput>): Promise<CarInput> => {
    try {
        // Construct the payload with the properties in the correct order
        const payload = {
            id: carData.id, // Ensure `id` is included in the request
            color: carData.color,
            electric: carData.electric,
            brand: carData.brand,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // Send the ordered payload
        });

        if (!response.ok) {
            throw new Error('Failed to add car');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding car:', error);
        throw error;
    }
};
const CarService = {
    getAllCars,
    getCarById,
    addCar,
};

export default CarService;
