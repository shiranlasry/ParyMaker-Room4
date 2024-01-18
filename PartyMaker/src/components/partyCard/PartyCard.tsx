// PartyCard.jsx
import React, { useEffect, useState } from 'react';
import { Party } from '../../types-env';
import './partyCard.scss';
import axios from 'axios';

type PartyCardProps = {
  party: Party;
};

const PartyCard: React.FC<PartyCardProps> = ({ party }) => {
  useEffect(() => {
    console.log(party);
  }, [party.party_id]);

  return (
    <div className="party-card">
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
          <img
              src={`data:image/png;base64,${party.party_img_data}`}
              alt={party.party_img_name}
              className='party-image'
            />
          <button>Join Party</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PartyCard;
