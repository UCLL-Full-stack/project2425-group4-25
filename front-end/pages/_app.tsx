import React from 'react';
import { AppProps } from 'next/app';
import Header from '../components/header'; // Check the path matches the actual location of the file
import '../styles/globals.css'; // Ensure you have global styles if needed

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
