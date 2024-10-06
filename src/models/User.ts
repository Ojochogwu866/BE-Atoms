import mongoose, { Document, mongo, Schema } from "mongoose";
import bcrypt from 'bcrypt'
import { timeStamp } from "console";

/** */

export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword(userPassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {timestamps: true});

UserSchema.pre<IUser>('save', async function(next){
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function(userPassword: string): Promise<boolean> {
    return bcrypt.compare(userPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema)