export interface CartItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
}

export interface ICart {
    user?: string;
    sessionId?: string;
    items: CartItem[];
}
