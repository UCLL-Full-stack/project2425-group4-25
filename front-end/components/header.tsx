import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-black text-white p-4">
            <nav className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Banden Bekers-Bex</h2>
                <div className="space-x-4">
                    <Link href="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>
                    <Link href="/cars" className="text-white hover:text-gray-300">
                        Cars
                    </Link>
                    <Link href="/maintenances" className="text-white hover:text-gray-300">
                        Maintenances
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
