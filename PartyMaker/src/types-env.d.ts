export interface User{
    Userid: string;
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: Address;
    role: string;

}
 export interface Address{
    Addressid: string;
    city: string;
    street: string;
    houseNumber: number;
}
export interface Party{
    Partyid: string;
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
    PartyTypeid: string;
    partyTypeName: string;
    createdAt: Date;    
}