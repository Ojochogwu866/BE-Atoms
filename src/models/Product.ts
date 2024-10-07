import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
    name: string
    description: string
    price: number
    category: string
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: String, required: true},
    category: { type: String, required: true },
}, { timestamps: true})

export default mongoose.model<IProduct>('Product', ProductSchema)