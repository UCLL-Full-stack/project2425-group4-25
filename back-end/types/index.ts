type CarInput = {
    id?: number;
    brand: string;
    color: string;
    electric: boolean;
    maintenances:MaintenanceInput[];
};

type MaintenanceInput = {
    id?: number;
    type: string;
    description: string;
    cost: number;
    date: Date;
    duration: number; // Duration in hours
    cars: CarInput[]; // Associated cars
};


export {
    CarInput,
    MaintenanceInput,
};