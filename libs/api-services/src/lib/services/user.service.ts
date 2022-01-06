import User, { IUser } from '../db/user.model';

export async function findOne(id: string) {
  return await User.findById(id);
}

export async function query(query: any) {
  return await User.find(query);
}

export async function create(user: IUser) {
  return await User.create(user);
}

export async function update(id: string, user: IUser) {
  return await User.findByIdAndUpdate(id,user)
}

export async function remove(id: string) {
  return await User.findByIdAndDelete(id);
}
