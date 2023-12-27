import { Party, PartyType, User } from "../types-env";

const usersData:User[] = [
  {
    email: "john.doe@gmail.com",
    password: "john123",
    username: "john_doe",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "0543432847",
    address: {
      city: "Tel Aviv",
      street: "Ben Yehuda",
      houseNumber: 12
    },
    role: "admin"
  },

 {
  email: "shiran.doe@gmail.com",
    password: "shiran123",
    username: "shiran_shiran",
    firstName: "shiran",
    lastName: "shiran",
    phoneNumber: "0543432847",
    address: {
      city: "Tel Aviv",
      street: "Ben shiran",
      houseNumber: 124
    },
    role: "user"
 },
 {
  email: "doriel.doe@gmail.com",
  password: "doriel123",
  username: "doriel_doriel",
  firstName: "doriel",
  lastName: "doriel",
  phoneNumber: "056985685",
  address: {
    city: "Tel doriel",
    street: "Ben doriel",
    houseNumber: 1824
  },
  role: "user"
 },
 {
  email: "lee.doe@gmail.com",
    password: "lee123",
    username: "lee_lee",
    firstName: "lee",
    lastName: "lee",
    phoneNumber: "0547856325",
    address: {
      city: "Tel lee",
      street: "Ben lee",
      houseNumber: 1524
    },
    role: "user"
 },
 {
  email: "hadar.doe@gmail.com",
  password: "hadar123",
  username: "hadar_hadar",
  firstName: "hadar",
  lastName: "hadar",
  phoneNumber: "02562548",
  address: {
    city: "Tel hadar",
    street: "Ben hadar",
    houseNumber: 1424
  },
  role: "user"
 }
];

const partyTypesData: PartyType[] = [
  {
    partyTypeName: "Birthday",
    createdAt: new Date()
  },
  {
    partyTypeName: "Wedding",
    createdAt: new Date()
  },
  {
    partyTypeName: "Bar Mitzva",
    createdAt: new Date()
  },
  {
    partyTypeName: "Brit",
    createdAt: new Date()
  },
  {
    partyTypeName: "Graduation",
    createdAt: new Date()
  }
];

const partiesData:Party[] = [
  {
    partyName: "John's Birthday",
    partyDate: "2021-01-01",
    partyTime: "12:00",
    partyLocation: "Tel Aviv",
    partyType: partyTypesData[0],
    partyDescription: "John's Birthday",
    partyPrice: 100,
    partyImage: "https://picsum.photos/200",
    partyCreator: usersData[0],
    partyParticipants: [usersData[0], usersData[1]],
    thingsToBring: ["Cake", "Candles", "Balloons"],
    createdAt: new Date()
  },
  {
    partyName: "Shiran's Birthday",
    partyDate: "2021-01-01",
    partyTime: "12:00",
    partyLocation: "Tel Aviv",
    partyType: partyTypesData[0],
    partyDescription: "Shiran's Birthday",
    partyPrice: 100,
    partyImage: "https://picsum.photos/200",
    partyCreator: usersData[1],
    partyParticipants: [usersData[0], usersData[1]],
    createdAt: new Date()
  },
  {
    partyName: "Doriel's Birthday",
    partyDate: "2021-01-01",
    partyTime: "12:00",
    partyLocation: "Tel Aviv",
    partyType: partyTypesData[0],
    partyDescription: "Doriel's Birthday",
    partyPrice: 100,
    partyImage: "https://picsum.photos/200",
    partyCreator: usersData[2],
    partyParticipants: [usersData[0], usersData[1]],
    thingsToBring: ["Cake", "Candles", "Balloons"],
    createdAt: new Date()
  },
  {
    partyName: "Lee's Birthday",
    partyDate: "2021-01-01",
    partyTime: "12:00",
    partyLocation: "Tel Aviv",
    partyType: partyTypesData[0],
    partyDescription: "Lee's Birthday",
    partyPrice: 100,
    partyImage: "https://picsum.photos/200",
    partyCreator: usersData[3],
    partyParticipants: [usersData[0], usersData[1]],
    createdAt: new Date()
  },
  {
    partyName: "Hadar's Birthday",
    partyDate: "2021-01-01",
    partyTime: "12:00",
    partyLocation: "Tel Aviv",
    partyType: partyTypesData[0],
    partyDescription: "Hadar's Birthday",
    partyPrice: 100,
    partyImage: "https://picsum.photos/200",
    partyCreator: usersData[4],
    partyParticipants: [usersData[0], usersData[1]],
    createdAt: new Date()
  },
]




export { usersData, partyTypesData, partiesData };
