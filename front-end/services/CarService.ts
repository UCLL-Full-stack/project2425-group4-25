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

const CarService = {
    getAllCars,
    getCarById,
};

export default CarService;
