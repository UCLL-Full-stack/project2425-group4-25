export class Car {
    private id: number;
    private make: string;
    private model: string;
    private year: number;

    constructor(id: number, make: string, model: string, year: number) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
    }

    getId(): number {
        return this.id;
    }

    getMake(): string {
        return this.make;
    }

    getModel(): string {
        return this.model;
    }

    getYear(): number {
        return this.year;
    }

    
}