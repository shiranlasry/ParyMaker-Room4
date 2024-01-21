import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./partyPage.scss";
import NavBar from "../../components/navBar/NavBar";
import { Party } from "../../types-env";
import { incomingPartySelector, isUserjoinedPartySelector } from "../../features/parties/partiesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { deletePartyAPI, deletePartyPartcipantsAPI, getPartyById, isUserjoinedPartyAPI, partiesByUserIdJoined, updatePartyAPI } from "../../features/parties/partiesAPI";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { addPartyPartcipantsAPI } from "../../features/parties/partiesAPI";
import { getUserFromTokenApi } from "../../features/loggedInUser/userAPI";
import toast, { Toaster } from "react-hot-toast";
import EditParty from "../../components/edit-party/EditParty";
import { usersByPartyIdSelector } from "../../features/users/usersSlice";
import { getUsersByPartyIdAPI } from "../../features/users/usersAPI";
import UserCard from "../../components/user-card/UserCard";

const PartyPage = () => {
  const { party_id } = useParams<{ party_id: string }>();
  const [showEditForm, setShowEditForm] = useState(false); 
  const party: Party | null = useAppSelector(incomingPartySelector);
  const user = useAppSelector(userSelector);
  const usersjoinedParty = useAppSelector(usersByPartyIdSelector);
  const isUserjoined = useAppSelector(isUserjoinedPartySelector);
  const [showEditDel, setShowEditDel] = useState(false);  
  const navigate = useNavigate();
  
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
    dispatch(getUsersByPartyIdAPI(partyIdNumber));
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
      if(!user) toast.error('No Login user user')
      if(!party?.party_id ||!user?.user_id ) throw new Error('No party id or user id handleAddPartyParticipants()' );
      const args = { party_id: party.party_id, user_id: user.user_id };
      dispatch(addPartyPartcipantsAPI(args)); 
    } catch (error) {
      console.error(error);
    }
   
  }
  const handleDeletePartyParticipants = () => {
    try {
      if(!user) toast.error('No Login user user')
      if(!party?.party_id ||!user?.user_id ) throw new Error('No party id or user id handleAddPartyParticipants()' );
      const args = { party_id: party.party_id, user_id: user.user_id };
      dispatch(deletePartyPartcipantsAPI(args));
      toast.success('You left the party')
    } catch (error) {
      console.error(error);
    }

  };
  const handleDeleteParty = async (party_id: number | null) => {
    try {
      if (!party_id) throw new Error('No party id');
      if (!user?.user_id) throw new Error('No user id');
      const args = { party_id, role: user.role }; 
     await dispatch(deletePartyAPI(args));
      
      // navigete previous page
     
       navigate(-1);
      
    } catch (error) {
      console.error('Error deleting party:', error);
    }
  };
  const handleShowUpdateForm = () => {
    try {
      setShowEditForm(true);
     
    } catch (error) {
      console.error('Error editing party:', error);
    }
  };
  const handleSaveParty = async (editedParty: Party) => {
    try {
      const respons = await dispatch(updatePartyAPI(editedParty));

      if (respons) {
        if (!party_id) return; // Make sure party_id is available
        const partyIdNumber = parseInt(party_id);
        dispatch(getPartyById(partyIdNumber));
        toast.success("Profile updated successfully");
        //navigate("/");
      }

      setShowEditForm(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseUpdateForm = () => {
    setShowEditForm(false);
  };
  return (
    <div className="partyWraper">
      <NavBar />
      <Toaster position="top-right"/>
    {showEditForm? 
    <EditParty
    party={party}
    onSave={handleSaveParty}
    onClose={handleCloseUpdateForm}
  />:
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
           <button onClick={handleShowUpdateForm}>UPDATE PARTY</button>
          <button onClick={() => handleDeleteParty(party.party_id)}>Delete</button>
        </div>
      ) }
    </div>
  ) : (
    <p>Loading...</p>
  )}
     <h3>Users joined this party</h3>
  <div className="partyUsers">
 
    {usersjoinedParty && usersjoinedParty.map((user) => (
      <div className="usersjoinedParty" key={user.user_id}>
       <UserCard user={user} />
      </div>
    ))}
  </div>
  
</div>}
    </div>
  );
};

export default PartyPage;
