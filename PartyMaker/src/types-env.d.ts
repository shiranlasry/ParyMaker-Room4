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
    partyName: string;
    partyDate: string;
    partyTime: string;
    partyLocation: string;
    partyType: PartyType;
    partyDescription: string;
    partyPrice: number;
    partyImage: string;
    partyCreator: User;
    partyParticipants: User[];
    thingsToBring?: string[];
    createdAt: Date;

}
export interface PartyType{
    partyType_id: number;
    partyTypeName: string;
    createdAt: Date;    
}
