import { Car } from './car';

export class Maintenance {
    private id: number;
    private type: string;
    private description: string;
    private cost: number;
    private date: Date;
    private duration: number; // in hours
    private cars: Car[];

    constructor(id: number, type: string, description: string, cost: number, date: Date, duration: number, cars: Car[] = []) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.cost = cost;
        this.date = date;
        this.duration = duration;
        this.cars = cars;
    }

    getId(): number {
        return this.id;
    }

    getType(): string {
        return this.type;
    }

    getDescription(): string {
        return this.description;
    }

    getCost(): number {
        return this.cost;
    }

    getDate(): Date {
        return this.date;
    }

    getDuration(): number {
        return this.duration;
    }

    getCars(): Car[] {
        return this.cars;
    }

    addCar(car: Car): void {
        if (!this.cars.includes(car)) {
            this.cars.push(car);
        }
    }
}
