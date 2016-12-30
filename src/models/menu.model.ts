import * as mongoose from 'mongoose';

export interface IMenu extends mongoose.Document {
    food: string,
    price: number,
    isAvailable: boolean
}

export const MenuSchema = new mongoose.Schema({
    food: String,
    price: Number,
    isAvailable: Boolean
});

const Menu = mongoose.model<IMenu>('Menu', MenuSchema);
export default Menu;
