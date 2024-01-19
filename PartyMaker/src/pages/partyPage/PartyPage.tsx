import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./partyPage.scss";
import NavBar from "../../components/navBar/NavBar";
import { Party } from "../../types-env";
import { incomingPartySelector } from "../../features/parties/partiesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getPartyById } from "../../features/parties/partiesAPI";

const PartyPage = () => {
  const party: Party | null = useAppSelector(incomingPartySelector);
  const dispatch = useAppDispatch();

  const { party_id } = useParams<{ party_id: string }>();
  // Convert partyId to a number if needed
  if (!party_id) throw new Error("No partyId provided");
  const partyIdNumber = parseInt(party_id, 10);

  useEffect(() => {
    dispatch(getPartyById(partyIdNumber));
    console.log(party);
  }, [partyIdNumber]); // Run the effect when partyIdNumber changes

  return (
    <>
      <NavBar />
      <div className="main">
        <h1>Party Page</h1>
        {party ? (
          <div>
            <h2>{party.party_name}</h2>
            {party.party_date !== null ? (
              <p>Date: {new Date(party.party_date).toLocaleDateString()}</p>
            ) : (
              <p>Date: Not available</p>
            )}
            <p>Location: {party.party_location}</p>
            <p>Category: {party.category_description}</p>
            <p>Description: {party.party_description}</p>
            <p>Price: {party.party_price}</p>
            <div>
              <p>Image:</p>
              <img
                src={`data:image/png;base64,${party.party_img_data}`}
                alt={party.party_img_name}
                className="party-image"
              />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default PartyPage;
