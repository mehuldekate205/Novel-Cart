import { Cart } from "./cart.model";

export class Order {
    orderDetails: Cart[] = [];
    cartTotal: number = 0;
    orderId: string = '';
    orderDate!: Date;
}