import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import EditParty from "../../components/edit-party/EditParty";
import GeneralBtn from "../../components/generalBtn/GeneralBtn";
import NavBar from "../../components/navBar/NavBar";
import UserCard from "../../components/user-card/UserCard";
import { getUserFromTokenApi } from "../../features/loggedInUser/userAPI";
import { userSelector } from "../../features/loggedInUser/userSlice";
import { addPartyPartcipantsAPI, deletePartyAPI, deletePartyPartcipantsAPI, getPartyById, isUserjoinedPartyAPI, updatePartyAPI } from "../../features/parties/partiesAPI";
import { incomingPartySelector, isUserjoinedPartySelector } from "../../features/parties/partiesSlice";
import { getUsersByPartyIdAPI } from "../../features/users/usersAPI";
import { usersByPartyIdSelector } from "../../features/users/usersSlice";
import { Party } from "../../types-env";
import "./partyPage.scss";


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

   const handleAddPartyParticipants = async () => {
    try {
      if (!user) {
        toast.error('No logged-in user');
        return;
      }
  
      if (!party?.party_id || !user?.user_id) {
        throw new Error('No party id or user id in handleAddPartyParticipants');
      }
  
      const args = { party_id: party.party_id, user_id: user.user_id };
  
      // Dispatch addPartyPartcipantsAPI and wait for it to complete
      await dispatch(addPartyPartcipantsAPI(args));
  
      // After the participants are added or removed, update the user list
      const partyIdNumber = parseInt(party_id!);
      dispatch(getUsersByPartyIdAPI(partyIdNumber));
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDeletePartyParticipants = async() => {
    try {
      if(!user) toast.error('No Login user user')
      if(!party?.party_id ||!user?.user_id ) throw new Error('No party id or user id handleAddPartyParticipants()' );
      const args = { party_id: party.party_id, user_id: user.user_id };
      await dispatch(deletePartyPartcipantsAPI(args));
      const partyIdNumber = parseInt(party_id!);
      dispatch(getUsersByPartyIdAPI(partyIdNumber));
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
      {isUserjoined ? (
  <GeneralBtn buttonText="Leave Party" onClick={handleDeletePartyParticipants} />
) : (
  <GeneralBtn buttonText="Join Party" onClick={handleAddPartyParticipants} />
)}
      {showEditDel && (
        <div className="editDel">
           <GeneralBtn buttonText="Update Party" onClick={handleShowUpdateForm}/>
          <GeneralBtn buttonText="Delete Party" onClick={() => handleDeleteParty(party.party_id)}/>
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
