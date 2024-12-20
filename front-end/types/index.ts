export type Maintenance = {
    id: number;
    type: string;
    description: string;
    cost: number; // Cost of the maintenance
    date: string; // ISO string format for date-time
    duration: number; // Duration in hours
    cars: { // Associated cars
        id: number;
        color: string;
        electric: boolean;
        brand: string;
        garageId?: number; // Garage the car belongs to
    }[];
};

export type MaintenanceInput = {
    id?: number; // Optional during creation
    type: string;
    description: string;
    cost: number; // Cost of the maintenance
    date: string; // ISO string format for input consistency
    duration: number; // Duration in hours
    carIds: number[]; // car IDs associated with the maintenance
};


export type Car = {
    id: number;
    brand: string;
    color: string;
    electric: boolean;
    garageId: number; // Associated garage
    maintenances: Maintenance[]; // array of associated maintenances
};

export type CarInput = {
    id?: number;
    color: string;
    electric: boolean;
    brand: string;
    garageId?: number; // Associated garage
};

export type User = {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: string;
};

export type UserInput = {
    firstName?: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role: string;
};

export type Garage = {
    id?: number;
    name: string;
    size: number;
    place: string;
    cars: CarInput[];
};

export type GarageInput = {
    id?: number;
    name: string;
    size: number;
    place: string;
};

