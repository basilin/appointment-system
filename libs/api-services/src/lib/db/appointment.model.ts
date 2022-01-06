import { Schema, model, Types } from 'mongoose';

export interface IAppointment {
  date: string;
  sellerId: Types.ObjectId;
  status: number;
}

const AppointmentSchema: Schema = new Schema({
  date: { type: Date, required: true },
  sellerId: { type: Schema.Types.ObjectId, required: true },
  status: { type: Number, required: true }
});

// Export the model and return your IAppointment interface
export default model<IAppointment>('Appointment', AppointmentSchema);
