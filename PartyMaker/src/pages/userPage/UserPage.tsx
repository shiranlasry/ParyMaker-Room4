import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import { useAppSelector } from "../../app/hook";
import { Party, User } from "../../types-env";
import "./userPage.scss";
import PartyCard from "../../components/partyCard/PartyCard";

const UserPage = () => {
  const navigate = useNavigate();
  const user: User | null = useAppSelector((state) => state.user.value);
  const [userParties, setUserParties] = useState<Party[]>([]);

  useEffect(() => {
    const fetchUserParties = async () => {
      if (user) {
        try {
          const response = await fetch(
            `/api/parties/get-user-parties/${user.user_id}`
          );
          const data = await response.json();
          setUserParties(data.parties);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserParties();
  }, [user]);

  return (
    <div>
      <NavBar />
      <h2>My Events</h2>
      <h2>Edit Profile</h2>
      {/* in process - 11.1.2024 - editProfile.tsx components is going to 
      go here and make the profile edit possible */}
      <h2>Parties I joined</h2>
      {/* The parties the user joined will be rendered here */}
      <button
        onClick={() => navigate("/addNewParty")}
        className="createPartyUP"
      >
        Create Party 🎉
      </button>

      {/* Display parties created by the user */}
      <div className="userParties">
        {userParties.map((party) => (
          <div key={party.party_id} className="partyItem">
            <h3>{party.partyName}</h3>
            <PartyCard party={party} />
            <button onClick={() => navigate(`/editParty/${party.party_id}`)}>
              Edit Party 🎉
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
