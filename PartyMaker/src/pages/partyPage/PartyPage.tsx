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
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PartyPage;
