import { Country } from "./country.model";
import { Order } from "./order.model";

export class City {
    id: number;
    city_name: string;
    country: Country;
    orders: Order[];
}
