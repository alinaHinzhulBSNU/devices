import { Model } from "./model.model";

export class Device {
    id: number;
    total_quantity: number;
    price: number;
    discount: number;
    ram: number;
    rom: number;
    color: string;
    image: string;
    model: Model;
}
