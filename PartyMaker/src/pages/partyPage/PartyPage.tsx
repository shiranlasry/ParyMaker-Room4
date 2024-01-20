import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./partyPage.scss";
import NavBar from "../../components/navBar/NavBar";
import { Party } from "../../types-env";
import { incomingPartySelector, isUserjoinedPartySelector } from "../../features/parties/partiesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { deletePartyPartcipantsAPI, getPartyById, isUserjoinedPartyAPI, partiesByUserIdJoined } from "../../features/parties/partiesAPI";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { addPartyPartcipantsAPI } from "../../features/parties/partiesAPI";
import { getUserFromTokenApi } from "../../features/loggedInUser/userAPI";

const PartyPage = () => {
  const { party_id } = useParams<{ party_id: string }>();
  const party: Party | null = useAppSelector(incomingPartySelector);
  const user = useAppSelector(userSelector);
  const isUserjoined = useAppSelector(isUserjoinedPartySelector);
  const [showEditDel, setShowEditDel] = useState(false);  
  
  const dispatch = useAppDispatch();
  const getUserFromToken = async () => {
    try {
      const response = await dispatch(getUserFromTokenApi());
      if (response) {
        console.log("getUserFromTokenApi response", response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    
    if (!party_id) return; // Make sure party_id is available
    const partyIdNumber = parseInt(party_id);
    dispatch(getPartyById(partyIdNumber));
  }, [party_id]); // Add party_id as a dependency

  useEffect(() => {
    if (!user) getUserFromToken();
    if (user && user.user_id && party && party.party_id ) {
      checkIfUserJoinedParty();
      dispatch(partiesByUserIdJoined(user.user_id));
      if (user.user_id === party.party_creator_id || user.role === 'admin' )
        setShowEditDel(true); 
    }
  }, [user,party]);

  const checkIfUserJoinedParty =async () => {
    try {
      
     if (!user?.user_id ||  !party?.party_id) throw new Error('No user id or party id checkIfUserJoinedParty()');
     const args = { party_id: party.party_id, user_id: user.user_id };
     dispatch(isUserjoinedPartyAPI(args));
    } catch (error) {
     console.error(error);
    }
   };

  const handleAddPartyParticipants = () => {
    try {
      if(!user) alert('No Login user user')
      if(!party?.party_id ||!user?.user_id ) throw new Error('No party id or user id handleAddPartyParticipants()' );
      const args = { party_id: party.party_id, user_id: user.user_id };
      dispatch(addPartyPartcipantsAPI(args)); 
    } catch (error) {
      console.error(error);
    }
   
  }
  const handleDeletePartyParticipants = () => {
    try {
      if(!user) alert('No Login user user')
      if(!party?.party_id ||!user?.user_id ) throw new Error('No party id or user id handleAddPartyParticipants()' );
      const args = { party_id: party.party_id, user_id: user.user_id };
      dispatch(deletePartyPartcipantsAPI(args));
      alert('You left the party')
    } catch (error) {
      console.error(error);
    }

  };
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
            {showEditDel && (
              <div className="editDel">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            ) }
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PartyPage;
