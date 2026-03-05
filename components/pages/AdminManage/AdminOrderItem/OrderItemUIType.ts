export type OrderItem = {
        id: string;
        order_id: string; 
        item_type:  "course" | "plan";
        item_id: string; 
        price: number; 
}

export type CreateOrderItemPayload = {
        order_id: string; 
        item_type:  "course" | "plan";
        item_id: string; 
        price: number; 
}

export type UpdateOrderItemPayload = {
        order_id: string; 
        item_type:  "course" | "plan";
        item_id: string; 
        price: number; 
}

