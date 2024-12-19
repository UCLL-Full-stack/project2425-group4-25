import React from "react";
import { Garage } from "@types";
import router from "next/router";

interface GarageOverviewTableProps {
    garages: Garage[];
}

const GarageOverviewTable: React.FC<GarageOverviewTableProps> = ({ garages }) => {
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Garage Overview</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-gray-800 text-gray-300 rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-700">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Size</th>
                            <th className="px-4 py-2">Place</th>
                            <th className="px-4 py-2">Number of Cars</th>
                        </tr>
                    </thead>
                    <tbody>
                        {garages.length > 0 ? (
                            garages.map((garage) => (
                                <tr key={garage.id} className="hover:bg-gray-700 border-b border-gray-600 cursor-pointer" onClick={() => router.push(`/garages/${garage.id}`)}>
                                    <td className="px-4 py-2">{garage.id}</td>
                                    <td className="px-4 py-2">{garage.name}</td>
                                    <td className="px-4 py-2">{garage.size}</td>
                                    <td className="px-4 py-2">{garage.place}</td>
                                    <td className="px-4 py-2">{garage.cars?.length || 0}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4">
                                    No garages available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GarageOverviewTable;
