import { Party } from "./partyModel";
let parties: Party[] = [];

export const getParties = (req, res) => {
  try {
    res.send({ parties });
  } catch (error) {
    console.error(error.message);
  }
};

export const addParty = (req, res) => {
  try {
    const party: Party = req.body;
    const createParty = (data: Party): Party => ({
      partyName: data.partyName,
      partyDate: data.partyDate,
      partyTime: data.partyTime,
      partyLocation: data.partyLocation,
      partyType: data.partyType,
      partyDescription: data.partyDescription,
      partyPrice: data.partyPrice,
      partyImage: data.partyImage,
      partyCreator: data.partyCreator,
      partyParticipants: data.partyParticipants,
      createdAt: data.createdAt,
      id: data.id,
    });
    parties.push(createParty(party));

    res.send({ parties });
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteParty = (req, res) => {
  try {
    const { id } = req.body;
    parties = parties.filter((party) => party.id !== id);
    res.send({ parties });
  } catch (error) {
    console.error(error.message);
  }
};

export const updateParty = (req, res) => {
  try {
    const {
      partyName,
      partyDate,
      partyTime,
      partyLocation,
      partyType,
      partyDescription,
      partyPrice,
      partyImage,
      partyCreator,
      partyParticipants,
      createdAt,
      id,
    } = req.body;
    console.log(req.body);
    if (
      !partyName ||
      !id ||
      !partyDate ||
      !partyTime ||
      !partyLocation ||
      !partyType ||
      !partyDescription ||
      !partyPrice ||
      !partyImage ||
      !partyCreator ||
      !partyParticipants ||
      !createdAt
    )
      throw new Error("Please complete all fields");
    const party = parties.find((party) => party.id === id);

    if (!party) throw new Error("party not found");
    party.partyName = partyName;
    party.partyDate = partyDate;
    party.partyTime = partyTime;
    party.partyLocation = partyLocation;
    party.partyType = partyType;
    party.partyDescription = partyDescription;
    party.partyPrice = partyPrice;
    party.partyImage = partyImage;
    party.partyCreator = partyCreator;
    party.partyParticipants = partyParticipants;
    party.createdAt = createdAt;
    party.id = id;

    res.send({ party });
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
}

export const getPartiesByUserId = (req, res) => {
    try {
        const userId = req.params.userId; // Assuming you can get user ID from the request parameters
        const userParties = parties.filter((party) => party.partyCreator.user_id === userId);
        res.send({ parties: userParties });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message });
    }
};
