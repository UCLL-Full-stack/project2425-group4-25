import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-80"></div>
                <img
                    src="/images/hero.png"
                    alt="Hero Background"
                    className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Our Vehicles</h1>
                    <p className="text-lg md:text-2xl mb-6">Find your car with ease</p>
                    <div className="flex w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search by model or brand..."
                            className="w-full p-3 rounded-l-lg text-black"
                        />
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg">Search</button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="flex justify-around text-center py-8">
                <div>
                    <h2 className="text-3xl font-bold">50+</h2>
                    <p>Available Cars</p>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">1K+</h2>
                    <p>Happy Customers</p>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">9</h2>
                    <p>Awards Won</p>
                </div>
            </section>

            {/* Popular Cars Section */}
            <section className="px-8 py-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Popular Cars</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="bg-white text-black rounded-lg overflow-hidden shadow-md"
                        >
                            <img
                                src="/images/ford.png"
                                alt="Car"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">Car Model {item}</h3>
                                <p className="text-gray-700 mb-4">Starting at $45,000</p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-white text-black py-10 px-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
                <p className="mb-6">
                    We believe in offering the best service for you. Here are the values we provide:
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Best interest rates on the market</li>
                    <li>Transparent pricing with no hidden fees</li>
                    <li>Quality assurance on all vehicles</li>
                </ul>
            </section>
        </div>
    );
};

export default HomePage;
