import Slot, { ISlot } from '../db/slot.model';
import Appointment, { IAppointment } from '../db/appointment.model';
import * as _ from 'lodash';

export async function findOne(id: string) {
  return await Slot.findById(id);
}

export async function query(query: any) {
  return await Slot.find(query);
}

export async function create(slot: ISlot) {
  return await Slot.create(slot);
}

export async function update(id: string, slot: ISlot) {
  return await Slot.findByIdAndUpdate(id, slot);
}

export async function remove(id: string) {
  return await Slot.findByIdAndDelete(id);
}

export async function appointmentSlots(sellerId: string, date: string) {
  const slots = await Slot.find({
    sellerId,
  });
  const appointments = await Appointment.find({
    sellerId,
    date,
  });
  const appointmentDict = _.keyBy(appointments, (x) => x.slotId);
  const result = _.map(slots, (slot: ISlot) => {
    const hasAppointment: boolean = appointmentDict[slot.id.toString()] ? true : false;
    return {
      name: slot.name,
      timeFrom: slot.timeFrom,
      sellerId: slot.sellerId,
      timeTo: slot.timeTo,
      hasAppointment,
      id: slot.id,
    };
  });
  return result;
}
