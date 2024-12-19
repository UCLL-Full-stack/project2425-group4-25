type Role = 'admin' | 'employee' | 'customer';

type UserInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    password: string;
};

type CarInput = {
    id?: number;
    brand: string;
    color: string;
    electric: boolean;
    garageId: number;
};

type MaintenanceInput = {
    id?: number;
    type: string;
    description: string;
    cost: number;
    date: Date;
    duration: number; 
};

type GarageInput = {
    id?: number;
    name: string;
    size: number;
    place: string;
};

export {
    Role,
    CarInput,
    MaintenanceInput,
    GarageInput,
    UserInput
};