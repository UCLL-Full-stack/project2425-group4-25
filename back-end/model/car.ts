import { Maintenance } from './maintenance';

export class Car {
    private id?: number; // `id` is optional and will be generated automatically
    private color: string;
    private electric: boolean;
    private brand: string;
    private maintenances: Maintenance[];

    constructor(color: string, electric: boolean, brand: string, maintenances: Maintenance[] = [], id?: number) {
        this.id = id;
        this.color = color;
        this.electric = electric;
        this.brand = brand;
        this.maintenances = maintenances;
    }

    getId(): number | undefined {
        return this.id;
    }

    getColor(): string {
        return this.color;
    }

    isElectric(): boolean {
        return this.electric;
    }

    getBrand(): string {
        return this.brand;
    }

    getMaintenances(): Maintenance[] {
        return this.maintenances;
    }

    addMaintenance(maintenance: Maintenance): void {
        if (!this.maintenances.includes(maintenance)) {
            this.maintenances.push(maintenance);
        }
    }
}
