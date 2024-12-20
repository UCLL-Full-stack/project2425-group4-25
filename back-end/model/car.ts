import {
    Car as CarPrisma,
    Maintenance as MaintenancePrisma,
    User as UserPrisma,
} from '@prisma/client';
import { Maintenance } from './maintenance';
import { User } from './user';

export class Car {
    readonly id?: number;
    readonly color: string;
    readonly electric: boolean;
    readonly brand: string;
    readonly garageId: number;
    readonly maintenances: Maintenance[];
    readonly user?: User;

    constructor(car: {
        id?: number;
        color: string;
        electric: boolean;
        brand: string;
        garageId: number;
        maintenances?: Maintenance[];
        user?: User;
    }) {
        this.validate(car);

        this.id = car.id;
        this.color = car.color;
        this.electric = car.electric;
        this.brand = car.brand;
        this.garageId = car.garageId;
        this.maintenances = car.maintenances ?? [];
        this.user = car.user;
    }

    validate(car: {
        color: string;
        electric: boolean;
        brand: string;
        garageId: number;
        maintenances?: Maintenance[];
        user?: User;
    }) {
        if (!car.color) {
            throw new Error('Color is required');
        }
        if (typeof car.electric !== 'boolean') {
            throw new Error('Electric must be a boolean');
        }
        if (!car.brand) {
            throw new Error('Brand is required');
        }
        if (!car.garageId) {
            throw new Error('GarageId is required');
        }
    }

    equals({
        id,
        color,
        electric,
        brand,
        garageId,
        maintenances = [],
        user,
    }: {
        id?: number;
        color: string;
        electric: boolean;
        brand: string;
        garageId: number;
        maintenances?: Maintenance[];
        user?: User;
    }): boolean {
        return (
            this.id === id &&
            this.color === color &&
            this.electric === electric &&
            this.brand === brand &&
            this.garageId === garageId &&
            this.maintenances.length === maintenances.length &&
            this.maintenances.every((m, i) => m.equals(maintenances[i])) &&
            this.user?.equals(user)
        );
    }

    static from(prismaCar: CarPrisma & {
        maintenances?: { maintenance: MaintenancePrisma }[]; user?: UserPrisma;
    }): Car {
        const maintenances = prismaCar.maintenances?.map((m) =>
            Maintenance.from(m.maintenance)
        ) || [];
        const user = prismaCar.user ? User.from(prismaCar.user) : undefined;


        return new Car({
            id: prismaCar.id,
            color: prismaCar.color,
            electric: prismaCar.electric,
            brand: prismaCar.brand,
            garageId: prismaCar.garageId,
            maintenances,
            user,
        });
    }
}
