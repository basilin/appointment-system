import { Schema, model } from 'mongoose';

export interface ISeller {
  name: string;
  email: string;
  location: string;
}
const opts = { toJSON: { virtuals: true } };
const SellerSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    location: { type: String },
  },
  opts
);

export default model<ISeller>('Seller', SellerSchema);
