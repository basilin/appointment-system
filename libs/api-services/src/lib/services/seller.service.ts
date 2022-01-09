import Seller, { ISeller } from '../db/seller.model';

export async function findOne(id: string) {
  return await Seller.findById(id).exec();
}

export async function searchByName(namePart: string) {
  return await Seller.find({name:{$regex:namePart,$options:'i'}}).exec();
}

export async function query(query: any) {
  return await Seller.find(query);
}

export async function create(seller: ISeller) {
  return await Seller.create(seller);
}

export async function update(id: string, seller: ISeller) {
  return await Seller.findByIdAndUpdate(id,seller)
}

export async function remove(id: string) {
  return await Seller.findByIdAndDelete(id);
}
