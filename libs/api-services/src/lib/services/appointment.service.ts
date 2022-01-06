import Appointment, { IAppointment } from "../db/appointment.model";

export async function findOne(id: string) {
  return await Appointment.findById(id);
}

export async function query(query: any) {
  return await Appointment.find(query);
}

export async function create(appointment: IAppointment) {
  return await Appointment.create(appointment);
}

export async function update(id: string, appointment: IAppointment) {
  return await Appointment.findByIdAndUpdate(id,appointment)
}

export async function remove(id: string) {
  return await Appointment.findByIdAndDelete(id);
}
