import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	email: string;
	password: string;
	role: 'user' | 'admin' | 'superuser';
	comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ['user', 'admin', 'superuser'],
			default: 'user',
		},
	},
	{ timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.comparePassword = async function (
	userPassword: string
): Promise<boolean> {
	return bcrypt.compare(userPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
