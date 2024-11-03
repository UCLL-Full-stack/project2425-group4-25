import { Maintenance } from './maintenance';

export class Car {
    private id: number;
    private color: string;
    private electric: boolean;
    private brand: string;
    private maintenances: Maintenance[];

    constructor(id: number, color: string, electric: boolean, brand: string, maintenances: Maintenance[] = []) {
        this.id = id;
        this.color = color;
        this.electric = electric;
        this.brand = brand;
        this.maintenances = maintenances;
    }

    getId(): number {
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
