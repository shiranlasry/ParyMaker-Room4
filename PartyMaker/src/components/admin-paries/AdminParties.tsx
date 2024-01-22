//admin parties page

import React, { useState } from "react";
import NavBar from "../navBar/NavBar";
import "./AdminParties.scss";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { partiesSelector } from "../../features/parties/partiesSlice";
import {
  deletePartyAPI,
  updatePartyAPI,
} from "../../features/parties/partiesAPI";
import { userSelector } from "../../features/loggedInUser/userSlice";
import PartyCard from "../partyCard/PartyCard";
import toast from "react-hot-toast";
import { Party } from "../../types-env";
import EditParty from "../edit-party/EditParty";
import GeneralBtn from "../generalBtn/GeneralBtn";

const AdminParties = () => {
  const parties = useAppSelector(partiesSelector);
  const user = useAppSelector(userSelector);
  const [showEditParty, setShowEditParty] = useState(false);
  const [selectedPartyId, setSelectedPartyId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  const filteredParties = parties?.filter(
    (party) =>
      party.party_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (party.party_date &&
        party.party_date.toString().includes(searchTerm.toLowerCase()))
  );
  const handleSaveParty = async (editedParty: Party) => {
    try {
      const respons = await dispatch(updatePartyAPI(editedParty));

      if (respons) {
        toast.success("Profile updated successfully");
        //navigate("/");
      }

      setShowEditParty(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleShowUpdateForm = (party_id: number | null) => {
    try {
      if (!party_id) throw new Error("No party id");
      setShowEditParty(true);
      setSelectedPartyId(party_id);
    } catch (error) {
      console.error("Error updating party:", error);
    }

  };
  const handleCloseUpdateForm = () => {
    setShowEditParty(false);
  };

  const handleDeleteParty = async (party_id: number | null) => {
    try {
      if (!party_id) throw new Error("No party id");
      if (!user?.user_id) throw new Error("No user id");
      const args = { party_id, role: user.role };
      dispatch(deletePartyAPI(args));
    } catch (error) {
      console.error("Error deleting party:", error);
    }
  };

  return (
    <div className="mainAdminParties">
      <NavBar />
      <h1>Admin Parties</h1>

      <input
        className="adminSearch"
        type="text"
        placeholder="Search by name or date..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredParties &&
        filteredParties.map((party) => (
          <div className="party-card-admin">
            <div className="adminCard">
              <PartyCard key={party.party_id} party={party} />
            </div>
            <GeneralBtn
              buttonText="Delete Party"
              onClick={() => handleDeleteParty(party.party_id)}
            />
            <GeneralBtn
              buttonText="Update Party"
              onClick={() => handleShowUpdateForm(party.party_id)}
            />
            {showEditParty && selectedPartyId === party.party_id && (
              <EditParty
                party={party}
                onSave={handleSaveParty}
                onClose={handleCloseUpdateForm}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default AdminParties;
