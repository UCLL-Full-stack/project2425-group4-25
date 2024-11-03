import React from 'react';
import CarOverviewTable from '../../components/cars/CarOverviewTable';

const CarsPage: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Cars Overview</h1>
            <CarOverviewTable />
        </div>
    );
};

export default CarsPage;
