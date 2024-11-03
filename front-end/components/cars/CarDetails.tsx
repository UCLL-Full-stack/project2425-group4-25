import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CarService from '../../services/CarService';
import { Car, Maintenance } from '../../types'; // Ensure you have these types defined

const CarDetails: React.FC = () => {
    const [car, setCar] = useState<Car | null>(null);
    const router = useRouter();
    const { carId } = router.query;

    useEffect(() => {
        if (carId) {
            const fetchCarDetails = async () => {
                try {
                    const carData = await CarService.getCarById(carId as string);
                    setCar(carData);
                } catch (error) {
                    console.error('Error fetching car details:', error);
                }
            };
            fetchCarDetails();
        }
    }, [carId]);

    if (!car) {
        return <p>Loading car details...</p>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Car Details</h2>
            <p><strong>ID:</strong> {car.id}</p>
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Electric:</strong> {car.electric ? 'Yes' : 'No'}</p>

            <h3>Maintenances</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #000', padding: '0.5rem' }}>Type</th>
                        <th style={{ border: '1px solid #000', padding: '0.5rem' }}>Description</th>
                        <th style={{ border: '1px solid #000', padding: '0.5rem' }}>Cost</th>
                        <th style={{ border: '1px solid #000', padding: '0.5rem' }}>Date</th>
                        <th style={{ border: '1px solid #000', padding: '0.5rem' }}>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {car.maintenances.length > 0 ? (
                        car.maintenances.map((maintenance, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #000', padding: '0.5rem' }}>{maintenance.type}</td>
                                <td style={{ border: '1px solid #000', padding: '0.5rem' }}>{maintenance.description}</td>
                                <td style={{ border: '1px solid #000', padding: '0.5rem' }}>${maintenance.cost}</td>
                                <td style={{ border: '1px solid #000', padding: '0.5rem' }}>{new Date(maintenance.date).toLocaleDateString()}</td>
                                <td style={{ border: '1px solid #000', padding: '0.5rem' }}>{maintenance.duration} hrs</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>No maintenances available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CarDetails;
