import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user?: mongoose.Types.ObjectId;
  sessionId?: string;           
  items: ICartItem[];
}

const CartSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,        
      unique: true,
      sparse: true,         
    },
    sessionId: {
      type: String,
      required: false,
      unique: true,
      sparse: true,         
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

CartSchema.pre('save', function(next) {
  if (!this.user && !this.sessionId) {
    next(new Error('Cart must have either user or sessionId'));
  }
  next();
});

CartSchema.index(
  { 
    user: 1, 
    sessionId: 1 
  }, 
  { 
    unique: true,
    partialFilterExpression: {
      $or: [
        { user: { $exists: true } },
        { sessionId: { $exists: true } }
      ]
    }
  }
);

export default mongoose.model<ICart>('Cart', CartSchema);