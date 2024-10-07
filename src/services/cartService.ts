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

	const existingItem = cart.items.find(
		(item) => item.product.toString() === productId
	);

	if (existingItem) {
		existingItem.quantity += quantity;
	} else {
		cart.items.push({ product: productId, quantity });
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
