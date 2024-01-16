export interface User {
  user_id: number | null;
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  role: string;
}
export interface Address {
  address_id: number | null;
  city: string | null;
  street: string | null;
  houseNumber: number | null;
}
export interface Category {
  category_id: number;
  category_description: string;
}
export interface Party {
  party_id: number | null;
  party_name: string;
  party_date: Date | null;
  party_location: string;
  party_category_id: number | null;
  category_description: string;
  party_description: string;
  party_price: number | null;
  party_image_id: number | null;
  party_creator_id: number | null;
  things_to_bring?: string;
  created_time: string;
}
export interface PartyType {
  partyType_id: number;
  partyTypeName: string;
  createdAt: Date;
}
