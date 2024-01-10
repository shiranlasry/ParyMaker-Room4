export interface User{
    user_id: number | null;
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    role: string;

}
 export interface Address{
    address_id: number;
    city: string;
    street: string;
    houseNumber: number;
}
export interface Party{
    party_id: number|null;
    party_name: string;
    party_date: string;
    party_time: string;
    party_location: string;
    party_type_id: number;
    party_description: string;
    party_price: number;
    party_image: string;
    party_creator: number;
    things_to_pbring?: string[];
    created_time: Date;

}
export interface PartyType{
    partyType_id: number;
    partyTypeName: string;
    createdAt: Date;    
}
