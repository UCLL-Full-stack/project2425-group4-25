import React, { useEffect, useState } from "react";
import GarageDetails from "@components/garages/GarageDetails";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GarageService from "../../services/GarageService";

const GarageDetailsPage: React.FC<{ garageId: string }> = ({ garageId }) => {
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
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Fetch all garages to generate paths
    const garages = await GarageService.getAllGarages();

    const paths = garages.map((garage: { id: number }) => ({
        params: { garageId: garage.id.toString() },
    }));

    return {
        paths,
        fallback: "blocking", // Allow non-predefined paths to be dynamically generated
    };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    const { garageId } = params as { garageId: string };

    return {
        props: {
            garageId,
            ...(await serverSideTranslations(locale || "en", ["common"])),
        },
    };
};

export default GarageDetailsPage;
