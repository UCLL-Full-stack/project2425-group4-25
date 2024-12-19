import { Car as CarPrisma, Maintenance as MaintenancePrisma } from '@prisma/client';
import { Maintenance } from './maintenance';

export class Car {
    readonly id?: number;
    readonly color: string;
    readonly electric: boolean;
    readonly brand: string;
    readonly garageId: number;
    readonly maintenances: Maintenance[];

    constructor({
        id,
        color,
        electric,
        brand,
        garageId,
        maintenances = [],
    }: {
        id?: number;
        color: string;
        electric: boolean;
        brand: string;
        garageId: number;
        maintenances?: Maintenance[];
    }) {
        this.id = id;
        this.color = color;
        this.electric = electric;
        this.brand = brand;
        this.garageId = garageId;
        this.maintenances = maintenances;
    }

    equals({
        id,
        color,
        electric,
        brand,
        garageId,
        maintenances = [],
    }: {
        id?: number;
        color: string;
        electric: boolean;
        brand: string;
        garageId: number;
        maintenances?: Maintenance[];
    }): boolean {
        return (
            this.id === id &&
            this.color === color &&
            this.electric === electric &&
            this.brand === brand &&
            this.garageId === garageId &&
            this.maintenances.length === maintenances.length &&
            this.maintenances.every((m, i) => m.equals(maintenances[i]))
        );
    }

    static from(
        prismaCar: CarPrisma & { maintenances?: { maintenance: MaintenancePrisma }[] }
    ): Car {
        const maintenances = prismaCar.maintenances?.map((m) =>
            Maintenance.from(m.maintenance)
        ) || [];

        return new Car({
            id: prismaCar.id,
            color: prismaCar.color,
            electric: prismaCar.electric,
            brand: prismaCar.brand,
            garageId: prismaCar.garageId,
            maintenances,
        });
    }

    // // If you need a method to add a maintenance, consider whether you want immutability.
    // // For immutability, return a new Car instance with the updated array:
    // addMaintenance(maintenance: Maintenance): Car {
    //     return new Car({
    //         id: this.id,
    //         color: this.color,
    //         electric: this.electric,
    //         brand: this.brand,
    //         garageId: this.garageId,
    //         maintenances: [...this.maintenances, maintenance],
    //     });
    // }
}
