export type Maintenance = {
    id: number;
    type: string;
    description: string;
    cost: number;
    date: string; // ISO sting format
    duration: number; //in hours
}

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

export type MaintenanceInput = {
    id?: number;
    type: string;
    description: string;
    cost: number;
    date: Date;
    duration: number; // Duration in hours
    cars: CarInput[]; // Associated cars
};

export type User = {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: string;
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