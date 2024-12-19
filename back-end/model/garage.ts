import { Garage as GaragePrisma, Car as CarPrisma } from '@prisma/client';
import { Car } from './car';

export class Garage {
    readonly id?: number;
    readonly name: string;
    readonly size: number;
    readonly place: string;
    readonly cars: Car[];

    constructor(garage: {
        id?: number;
        name: string;
        size: number;
        place: string;
        cars?: Car[];
    }) {
        this.validate(garage);

        this.id = garage.id;
        this.name = garage.name;
        this.size = garage.size;
        this.place = garage.place;
        this.cars = garage.cars ?? [];
    }

    validate(garage: { name: string; size: number; place: string; cars?: Car[] }) {
        if (!garage.name) {
            throw new Error('Name is required');
        }
        if (typeof garage.size !== 'number' || garage.size <= 0) {
            throw new Error('Size must be a positive number');
        }
        if (!garage.place) {
            throw new Error('Place is required');
        }
    }

    equals({
        id,
        name,
        size,
        place,
        cars = [],
    }: {
        id?: number;
        name: string;
        size: number;
        place: string;
        cars?: Car[];
    }): boolean {
        return (
            this.id === id &&
            this.name === name &&
            this.size === size &&
            this.place === place &&
            this.cars.length === cars.length &&
            this.cars.every((car, i) => car.equals(cars[i]))
        );
    }

    static from(
        prismaGarage: GaragePrisma & {
            cars?: (CarPrisma & { maintenances?: { maintenance: any }[] })[];
        }
    ): Garage {
        const cars = prismaGarage.cars?.map((c) => Car.from(c)) || [];
        return new Garage({
            id: prismaGarage.id,
            name: prismaGarage.name,
            size: prismaGarage.size,
            place: prismaGarage.place,
            cars,
        });
    }
}
