import { Schema, model, Types } from 'mongoose';

export interface ISlot {
  name: string;
  timeFrom: number;
  timeTo: number;
  isActive: boolean;
  sellerId: Types.ObjectId,
  id: Types.ObjectId,
}

const opts = { toJSON: { virtuals: true } };
const SlotSchema: Schema = new Schema({
  name: { type: String, required: true},
  timeFrom: { type: Number, required: true },
  timeTo: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  sellerId: { type: Schema.Types.ObjectId, required: true },
}, opts);
SlotSchema.index({ timeFrom: 1, timeTo: 1, sellerId: 1 }, { unique: true });
SlotSchema.index({ name: 1, sellerId: 1 }, { unique: true });
export default model<ISlot>('Slot', SlotSchema);
