import { Car } from "../model/car";

const cars: Car[] = [
    new Car(1, "Toyota", "Corolla", 2019),
    new Car(2, "Honda", "Civic", 2018),
    new Car(3, "Ford", "Focus", 2017),
];

const getCars = (): Car[] => {
    return cars;
};

export default {
    getCars,
}