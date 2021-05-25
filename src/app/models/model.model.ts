import { Brand } from "./brand.model";
import { Device } from "./device.model";

export class Model {
    id: number;
    model_name: string;
    description: string;
    diagonal: number;
    brand: Brand;
    devices: Device[];
}
