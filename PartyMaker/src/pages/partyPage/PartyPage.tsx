import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./partyPage.scss";
import NavBar from "../../components/navBar/NavBar";
import { Party } from "../../types-env";
import { incomingPartySelector, isUserjoinedPartySelector } from "../../features/parties/partiesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getPartyById, isUserjoinedPartyAPI } from "../../features/parties/partiesAPI";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { addPartyPartcipantsAPI } from "../../features/parties/partiesAPI";

const PartyPage = () => {
  const party: Party | null = useAppSelector(incomingPartySelector);
  const isUserjoined = useAppSelector(isUserjoinedPartySelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const { party_id } = useParams<{ party_id: string }>();
  // Convert partyId to a number if needed
  if (!party_id) throw new Error("No partyId provided");
  const partyIdNumber = parseInt(party_id, 10);

  const checkIfUserJoinedParty =async () => {
   try {
    
    if (!user?.user_id ||  !party?.party_id) throw new Error('No user id or party id checkIfUserJoinedParty()');
    const args = { party_id: party.party_id, user_id: user.user_id };
    dispatch(isUserjoinedPartyAPI(args));
   
   } catch (error) {
    console.error(error);
   }

  };

  useEffect(() => {
    dispatch(getPartyById(partyIdNumber));
    if(user)
    checkIfUserJoinedParty();
   

    console.log(party);
  }, [partyIdNumber,user]); // Run the effect when partyIdNumber changes

  const handleAddPartyParticipants = () => {
    try {
      debugger
      if(!user) alert('No Login user user')
      if(!party?.party_id ||!user?.user_id ) throw new Error('No party id or user id handleAddPartyParticipants()' );
      const args = { party_id: party.party_id, user_id: user.user_id };
      dispatch(addPartyPartcipantsAPI(args)); 
      
       
      
    } catch (error) {
      console.error(error);

      
    }
   
  }
  const handleDeletePartyParticipants = () => {};
  return (
    <div className="partyWraper">
      <NavBar />
      <div className="partyPmain">
        {party ? (
          <div className="partyContent">
            <h1>{party.party_name}🎉🎈</h1>
            {party.party_date !== null ? (
              <p>
                <span>Date:</span>{" "}
                {new Date(party.party_date).toLocaleDateString()}
              </p>
            ) : (
              <p>Date: Not available</p>
            )}
            <p>
              <span>Location:</span> {party.party_location}
            </p>
            <p>
              <span>Payment:</span> {party.party_price} ₪
            </p>
            <p>
              <span>Category:</span> {party.category_description}
            </p>

            <div className="partyImg">
              <img
                src={`data:image/png;base64,${party.party_img_data}`}
                alt={party.party_img_name}
                className="party-image"
              />
            </div>
            <p>
              <span>About the Party:</span> {party.party_description}
            </p>
            {isUserjoined? <button onClick={handleDeletePartyParticipants}>Leave Party</button> : <button onClick={handleAddPartyParticipants}>Join Party</button>
}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PartyPage;
