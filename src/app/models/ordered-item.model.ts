import { Device } from "./device.model";
import { Order } from "./order.model";

export class OrderedItem {
    item_id: number;
    quantity: number;
    total_sum: number;
    device: Device;
    order: Order;
}
