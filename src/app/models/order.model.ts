import { City } from "./city.model";

export class Order {
    id: number;
    address: string;
    customer_name: string;
    date: Date;
    phone: string;
    city: City;
}
