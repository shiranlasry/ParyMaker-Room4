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
    address_id: number| null;
    city: string| null;
    street: string| null;
    houseNumber: number| null;
}
export interface Party{
    party_id: number|null;
    party_name: string;
    party_date: Date | null;
    party_time: string;
    party_location: string;
    party_category_id: number| null;
    category_description: string;
    party_description: string;
    party_price: number| null;
    party_image: string;
    party_creator: number| null;
    things_to_pbring?: string[];
    created_time: Date;

}
export interface PartyType{
    partyType_id: number;
    partyTypeName: string;
    createdAt: Date;    
}
