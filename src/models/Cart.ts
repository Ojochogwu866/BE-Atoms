import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    user?: mongoose.Types.ObjectId | null;
    sessionId?: string;
    items: ICartItem[];
}

const CartSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            default: null
        },
        sessionId: {
            type: String,
            required: false
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
    },
    { timestamps: true }
);

CartSchema.index(
    { sessionId: 1 },
    { 
        unique: true,
        sparse: true,
        partialFilterExpression: { 
            sessionId: { $exists: true, $ne: null },
            user: null
        }
    }
);

export default mongoose.model<ICart>('Cart', CartSchema);