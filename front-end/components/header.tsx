import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = React.useState<string | null>(null);
    const router = useRouter();

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
                <h2 className="text-lg font-bold">Welcome to Banden Bekers-Bex {loggedInUser ? `, good to see you ${loggedInUser}` : ''}</h2>
                <div className="space-x-4">
                    <Link href="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>
                    <Link href="/garages" className="text-white hover:text-gray-300">
                        Garages
                    </Link>
                    <Link href="/cars" className="text-white hover:text-gray-300">
                        Cars
                    </Link>
                    <Link href="/maintenances" className="text-white hover:text-gray-300">
                        Maintenances
                    </Link>
                    {loggedInUser ? (
                        <button
                            onClick={handleLogout}
                            className="text-white hover:text-gray-300 focus:outline-none"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" className="text-white hover:text-gray-300">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
