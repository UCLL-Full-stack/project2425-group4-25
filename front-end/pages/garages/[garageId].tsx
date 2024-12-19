import React, { useEffect, useState } from "react";
import GarageDetails from "@components/garages/GarageDetails";
import { useRouter } from "next/router";

const GarageDetailsPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <h1 className="text-2xl font-bold">Please log in before visiting this page.</h1>
            </div>
        );
    }
    return <GarageDetails />;
}

export default GarageDetailsPage;