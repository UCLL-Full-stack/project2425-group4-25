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

    constructor({
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
    }) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.cost = cost;
        this.date = date;
        this.duration = duration;
        this.cars = cars;
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

    // addCar(car: Car): Maintenance {
    //     if (this.cars.includes(car)) {
    //         return this;
    //     }
    //     return new Maintenance({
    //         id: this.id,
    //         type: this.type,
    //         description: this.description,
    //         cost: this.cost,
    //         date: this.date,
    //         duration: this.duration,
    //         cars: [...this.cars, car],
    //     });
    // }
}
