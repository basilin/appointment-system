import { Schema, model } from 'mongoose';

export interface ISlot {
  name: string;
  timeFrom: number;
  timeTo: number;
  isActive: boolean;
}

const SlotSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  timeFrom: { type: Number, required: true },
  timeTo: { type: Number, required: true },
});

export interface ISeller {
  name: string;
  slots: ISlot[];
}

const SellerSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  slots: [SlotSchema],
});

// Export the model and return your IUser interface
export default model<ISeller>('Seller', SellerSchema);
