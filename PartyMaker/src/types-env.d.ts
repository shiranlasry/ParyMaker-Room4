export interface User{
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: Address;
    role: string;

}
interface Address{
    city: string;
    street: string;
    houseNumber: number;
}
export interface Party{
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
    partyTypeName: string;
    createdAt: Date;    
}