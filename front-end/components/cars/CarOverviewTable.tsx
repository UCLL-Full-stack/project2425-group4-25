import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CarService from '@services/CarService';
import { Car } from '../../types'; // Ensure you have the Car type defined in your types folder

const CarOverviewTable: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Fetch car data when the component is mounted
        const fetchCars = async () => {
            try {
                const data = await CarService.getAllCars();
                setCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Car Overview</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #000', padding: '0.5rem' }}>ID</th>
                        <th style={{ border: '1px solid #000', padding: '0.5rem' }}>Brand</th>
                        <th style={{ border: '1px solid #000', padding: '0.5rem' }}>Color</th>
                        <th style={{ border: '1px solid #000', padding: '0.5rem' }}>Electric</th>
                        <th style={{ border: '1px solid #000', padding: '0.5rem' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.length > 0 ? (
                        cars.map((car) => (
                            <tr key={car.id}>
                                <td style={{ border: '1px solid #000', padding: '0.5rem' }}>{car.id}</td>
                                <td style={{ border: '1px solid #000', padding: '0.5rem' }}>{car.brand}</td>
                                <td style={{ border: '1px solid #000', padding: '0.5rem' }}>{car.color}</td>
                                <td style={{ border: '1px solid #000', padding: '0.5rem' }}>
                                    {car.electric ? 'Yes' : 'No'}
                                </td>
                                <td style={{ border: '1px solid #000', padding: '0.5rem', textAlign: 'center' }}>
                                    <button
                                        onClick={() => router.push(`/cars/${car.id}`)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#0070f3',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Maintenances
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>
                                No cars available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CarOverviewTable;
