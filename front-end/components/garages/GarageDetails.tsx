import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GarageService from "../../services/GarageService";
import { Garage } from "../../types";

const GarageDetails: React.FC = () => {
    const [garage, setGarage] = useState<Garage | null>(null);
    const router = useRouter();
    const { garageId } = router.query;

    useEffect(() => {
        if (garageId) {
            const fetchGarageDetails = async () => {
                try {
                    const fetchedGarage = await GarageService.getGarageById(garageId as string);
                    setGarage(fetchedGarage);
                } catch (error) {
                    console.error("Error fetching garage details:", error);
                }
            };
            fetchGarageDetails();
        }
    }, [garageId]);

    if (!garage) {
        return <p className="text-white">Loading garage details...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-6">Garage Details</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <p><strong>ID:</strong> {garage.id}</p>
                <p><strong>Name:</strong> {garage.name}</p>
                <p><strong>Size:</strong> {garage.size}</p>
                <p><strong>Place:</strong> {garage.place}</p>
                <p><strong>Number of Cars:</strong> {garage.cars.length}</p>
            </div>

            <h2 className="text-2xl font-bold mb-4">Cars in Garage</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-gray-800 text-gray-300 rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-700">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Brand</th>
                            <th className="px-4 py-2">Color</th>
                            <th className="px-4 py-2">Electric</th>
                        </tr>
                    </thead>
                    <tbody>
                        {garage.cars.length > 0 ? (
                            garage.cars.map((car) => (
                                <tr key={car.id} className="hover:bg-gray-700 border-b border-gray-600" onClick={() => router.push(`/cars/${car.id}`)}>
                                    <td className="px-4 py-2">{car.id}</td>
                                    <td className="px-4 py-2">{car.brand}</td>
                                    <td className="px-4 py-2">{car.color}</td>
                                    <td className="px-4 py-2">{car.electric ? "Yes" : "No"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4">No cars available in this garage.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GarageDetails;
