import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Language from './language/Language';
import { useTranslation } from 'next-i18next';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = React.useState<string | null>(null);
    const router = useRouter();
    const { t } = useTranslation('common');

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(user);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('jwtToken'); // Remove JWT token
        setLoggedInUser(null);
        router.push('/'); // Redirect to home page
    };

    return (
        <header className="bg-black text-white p-4">
            <nav className="flex justify-between items-center">
                <h2 className="text-lg font-bold">
                    {t('header.welcome')} {loggedInUser ? `, ${t('header.goodToSeeYou', { name: loggedInUser })}` : ''}
                </h2>
                <div className="space-x-4 flex items-center">
                    <Language />
                    <Link href="/" className="text-white hover:text-gray-300">
                        {t('header.nav.home')}
                    </Link>
                    
                    {loggedInUser ? (
                        <>
                            <Link href="/garages" className="text-white hover:text-gray-300">
                                {t('header.nav.garages')}
                            </Link>
                            <Link href="/cars" className="text-white hover:text-gray-300">
                                {t('header.nav.cars')}
                            </Link>
                            <Link href="/maintenances" className="text-white hover:text-gray-300">
                                {t('header.nav.maintenances')}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-gray-300 focus:outline-none"
                            >
                                {t('header.nav.logout')}
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="text-white hover:text-gray-300">
                            {t('header.nav.login')}
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
