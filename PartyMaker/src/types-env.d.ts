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

}