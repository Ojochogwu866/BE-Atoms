import mongoose from 'mongoose';
import { ApplicationError } from '../middlewares/errorHandler';
import Cart, { ICart } from '../models/Cart';

export const addToGuestCart = async (
    sessionId: string,
    productId: string,
    quantity: number
): Promise<ICart> => {
    try {
        let cart = await Cart.findOne({ sessionId, user: null });
        
        if (!cart) {
            cart = new Cart({
                sessionId,
                user: null,
                items: []
            });
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);
        const existingItemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productObjectId.toString()
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productObjectId, quantity });
        }

        await cart.save();
        return cart.populate('items.product');
    } catch (error) {
        console.error('Error in addToGuestCart:', error);
        throw error;
    }
};

export const addToCart = async (
    userId: string,
    productId: string,
    quantity: number
): Promise<ICart> => {
    try {
        let cart = await Cart.findOne({ user: userId });
        
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: []
            });
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);
        const existingItemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productObjectId.toString()
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productObjectId, quantity });
        }

        await cart.save();
        return cart.populate('items.product');
    } catch (error) {
        console.error('Error in addToCart:', error);
        throw error;
    }
};

export const mergeGuestCart = async (
    sessionId: string,
    userId: string
): Promise<ICart> => {
    const guestCart = await Cart.findOne({ sessionId, user: null });
    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
        userCart = new Cart({ user: userId, items: [] });
    }

    if (guestCart) {
        for (const guestItem of guestCart.items) {
            const existingItem = userCart.items.find(
                (item) => item.product.toString() === guestItem.product.toString()
            );

            if (existingItem) {
                existingItem.quantity += guestItem.quantity;
            } else {
                userCart.items.push({
                    product: guestItem.product,
                    quantity: guestItem.quantity
                });
            }
        }

        await userCart.save();
        await guestCart.deleteOne();
    }

    return userCart.populate('items.product');
};

export const getCartByUserId = async (userId: string): Promise<ICart> => {
	const cart = await Cart.findOne({ user: userId }).populate('items.product');
	if (!cart) {
		throw new ApplicationError('Cart not found', 404);
	}
	return cart;
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
