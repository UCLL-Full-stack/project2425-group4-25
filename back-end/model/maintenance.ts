import { Maintenance as MaintenancePrisma, Car as CarPrisma } from '@prisma/client';
import { Car } from './car';

export class Maintenance {
    readonly id?: number;
    readonly type: string;
    readonly description: string;
    readonly cost: number;
    readonly date: Date;
    readonly duration: number;
    readonly cars: Car[];

    constructor(maintenance: {
        id?: number;
        type: string;
        description: string;
        cost: number;
        date: Date;
        duration: number;
        cars?: Car[];
    }) {
        this.validate(maintenance);

        this.id = maintenance.id;
        this.type = maintenance.type;
        this.description = maintenance.description;
        this.cost = maintenance.cost;
        this.date = maintenance.date;
        this.duration = maintenance.duration;
        this.cars = maintenance.cars ?? [];
    }

    validate(maintenance: {
        type: string;
        description: string;
        cost: number;
        date: Date;
        duration: number;
        cars?: Car[];
    }) {
        if (!maintenance.type) {
            throw new Error('Type is required');
        }
        if (!maintenance.description) {
            throw new Error('Description is required');
        }
        if (typeof maintenance.cost !== 'number' || maintenance.cost < 0) {
            throw new Error('Cost must be a non-negative number');
        }
        if (!(maintenance.date instanceof Date)) {
            throw new Error('Date must be a valid Date object');
        }
        if (typeof maintenance.duration !== 'number' || maintenance.duration < 0) {
            throw new Error('Duration must be a non-negative number');
        }
    }

    equals({
        id,
        type,
        description,
        cost,
        date,
        duration,
        cars = [],
    }: {
        id?: number;
        type: string;
        description: string;
        cost: number;
        date: Date;
        duration: number;
        cars?: Car[];
    }): boolean {
        return (
            this.id === id &&
            this.type === type &&
            this.description === description &&
            this.cost === cost &&
            this.date.getTime() === date.getTime() &&
            this.duration === duration &&
            this.cars.length === cars.length &&
            this.cars.every((car, i) => car.equals(cars[i]))
        );
    }

    static from(
        prismaMaintenance: MaintenancePrisma & { cars?: { car: CarPrisma & { maintenances?: { maintenance: any }[] } }[] }
    ): Maintenance {
        const cars = prismaMaintenance.cars?.map((c) => Car.from(c.car)) || [];
        return new Maintenance({
            id: prismaMaintenance.id,
            type: prismaMaintenance.type,
            description: prismaMaintenance.description,
            cost: prismaMaintenance.cost,
            date: prismaMaintenance.date,
            duration: prismaMaintenance.duration,
            cars,
        });
    }
}
