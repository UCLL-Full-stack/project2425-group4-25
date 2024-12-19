import { Garage as GaragePrisma, Car as CarPrisma } from '@prisma/client';
import { Car } from './car';

export class Garage {
    readonly id?: number;
    readonly name: string;
    readonly size: number;
    readonly place: string;
    readonly cars: Car[];

    constructor({
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
    }) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.place = place;
        this.cars = cars;
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
        prismaGarage: GaragePrisma & { cars?: (CarPrisma & { maintenances?: { maintenance: any }[] })[] }
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

    // // If needed, you can add methods that return new instances rather than mutating, 
    // // to maintain an immutable approach.
    // addCar(car: Car): Garage {
    //     if (this.cars.includes(car)) {
    //         return this;
    //     }
    //     return new Garage({
    //         id: this.id,
    //         name: this.name,
    //         size: this.size,
    //         place: this.place,
    //         cars: [...this.cars, car],
    //     });
    // }
}
