import { Schema, model, Types } from 'mongoose';

export interface IAppointment {
  _id: Types.ObjectId,
  date: string;
  sellerId: Types.ObjectId;
  status: number;
  userId: Types.ObjectId;
  slotId: Types.ObjectId;
}
const opts = { toJSON: { virtuals: true } };
const AppointmentSchema: Schema = new Schema(
  {
    date: { type: Date, required: true },
    sellerId: { type: Schema.Types.ObjectId, required: true, ref: 'Seller' },
    status: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    slotId: { type: Schema.Types.ObjectId, required: true, ref: 'Slot' },
  },
  opts
);
AppointmentSchema.index({ date: 1, slotId: 1 }, { unique: true });

export default model<IAppointment>('Appointment', AppointmentSchema);
