import Appointment, { IAppointment } from '../db/appointment.model';
import Seller, { ISeller } from '../db/seller.model';
import User, { IUser } from '../db/user.model';
import Slot, { ISlot } from '../db/slot.model';
import * as _ from 'lodash';

export async function findOne(id: string) {
  return await Appointment.findById(id);
}

export async function query(query: any) {
  const appointments = await Appointment.find(query);
  const sellerIds = _.map(appointments, (x) => x.sellerId);
  const userIds = _.map(appointments, (x) => x.userId);
  const slotIds = _.map(appointments, (x) => x.slotId);
  const sellers = await Seller.find({
    _id: { $in: sellerIds },
  });
  const users = await User.find({
    _id: { $in: userIds },
  });
  const slots = await Slot.find({
    _id: { $in: slotIds },
  });
  const sellerDict = _.keyBy(sellers, (x) => x._id);
  const userDict = _.keyBy(users, (x) => x._id);
  const slotDict = _.keyBy(slots, (x) => x._id);
  const appointmentMap = _.map(appointments as IAppointment[], (ap) => {
    const seller = sellerDict[ap.sellerId.toString()] as ISeller;
    const user = userDict[ap.userId.toString()] as IUser;
    const slot = slotDict[ap.slotId.toString()] as ISlot;
    return {
      id: ap._id,
      sellerName: seller.name,
      userName: `${user.firstName} ${user.lastName}`,
      slotName: slot.name,
      date: ap.date,
      sellerId: ap.sellerId,
      status: ap.status,
      statusName: ap.status == 1 ? 'Created': 'Approved',
      userId: ap.userId,
      slotId: ap.slotId,
    };
  });

  return appointmentMap;
}

export async function create(appointment: IAppointment) {
  return await Appointment.create(appointment);
}

export async function update(id: string, appointment: IAppointment) {
  return await Appointment.findByIdAndUpdate(id, appointment);
}

export async function remove(id: string) {
  return await Appointment.findByIdAndDelete(id);
}
