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
    maintenances: Maintenance[]; // array of associated maintenances
};

export type CarInput = {
    id?: number;
    color: string;
    electric: boolean;
    brand: string;
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
