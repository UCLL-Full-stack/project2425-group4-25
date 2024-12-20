import React, { useEffect, useState } from "react";
import MaintenanceDetails from "@components/maintenances/MaintenanceDetails";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MaintenanceService from "@services/MaintenanceService";


const MaintenanceDetailsPage: React.FC = () => {
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
    return <MaintenanceDetails />;
}
export const getStaticPaths: GetStaticPaths = async () => {
    const maintenances = await MaintenanceService.getAllMaintenances();
    const paths = maintenances.map((maintenance: { id: number }) => ({
        params: { maintenanceId: maintenance.id.toString() },
    }));
    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
});
export default MaintenanceDetailsPage;