import mongoose from 'mongoose';
import { ApplicationError } from '../middlewares/errorHandler';
import Cart, { ICart } from '../models/Cart';

export const getCartByUserId = async (userId: string): Promise<ICart> => {
	const cart = await Cart.findOne({ user: userId }).populate('items.product');
	if (!cart) {
		throw new ApplicationError('Cart not found', 404);
	}
	return cart;
};

export const addToCart = async (
	userId: string,
	productId: string,
	quantity: number
): Promise<ICart> => {
	let cart = await Cart.findOne({ user: userId });
	if (!cart) {
		cart = await Cart.create({ user: userId, items: [] });
	}
	const productObjectId = new mongoose.Types.ObjectId(productId);

	const existingItem = cart.items.find(
		(item) => item.product.toString() === productObjectId.toString()
	);

	if (existingItem) {
		existingItem.quantity += quantity;
	} else {
		cart.items.push({ product: productObjectId, quantity });
	}

	await cart.save();
	return cart.populate('items.product');
};

export const removeFromCart = async (
	userId: string,
	productId: string
): Promise<ICart> => {
	const cart = await Cart.findOne({ user: userId });
	if (!cart) {
		throw new ApplicationError('Cart not found', 404);
	}

	cart.items = cart.items.filter(
		(item) => item.product.toString() !== productId
	);

	await cart.save();
	return cart.populate('items.product');
};

export const clearCart = async (userId: string): Promise<void> => {
	const cart = await Cart.findOne({ user: userId });

	if (!cart) {
		throw new ApplicationError('Cart not found', 404);
	}

	cart.items = [];
	await cart.save();
};

export const getCartBySessionId = async (sessionId: string): Promise<ICart> => {
    let cart = await Cart.findOne({ sessionId }).populate('items.product');
    if (!cart) {
        cart = await Cart.create({ sessionId, items: [] });
    }
    return cart;
};

export const addToGuestCart = async (
    sessionId: string,
    productId: string,
    quantity: number
): Promise<ICart> => {
    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
        cart = await Cart.create({ sessionId, items: [] });
    }
    
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const existingItem = cart.items.find(
        item => item.product.toString() === productObjectId.toString()
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ product: productObjectId, quantity });
    }

    await cart.save();
    return cart.populate('items.product');
};

export const mergeGuestCart = async (
    sessionId: string,
    userId: string
): Promise<ICart> => {
    const guestCart = await Cart.findOne({ sessionId });
    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
        userCart = await Cart.create({ user: userId, items: [] });
    }

    if (guestCart) {
        // Merge items from guest cart to user cart
        for (const guestItem of guestCart.items) {
            const existingItem = userCart.items.find(
                item => item.product.toString() === guestItem.product.toString()
            );

            if (existingItem) {
                existingItem.quantity += guestItem.quantity;
            } else {
                userCart.items.push(guestItem);
            }
        }

        await userCart.save();
        await Cart.deleteOne({ _id: guestCart._id });
    }

    return userCart.populate('items.product');
};
