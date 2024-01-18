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
    <div className="partyCard">
      {party ? (
        <div>
          <h2 className='partyName'>{party.party_name}</h2>
          <div className="partyContent">
            <div className="imageOverlay" style={{ backgroundImage: `url(data:image/png;base64,${party.party_img_data})` }}>
              {party.party_date !== null ? (<div className='partyDetails'>
                <p>{party.category_description} | {party.party_location} | {new Date(party.party_date).toLocaleDateString()}</p></div>
              ) : (
                <p>Date: Not available</p>
              )}
            </div>
          </div>
          <div className="party-description">
            <h4>{party.party_description}</h4>
            <h4>{party.party_price}₪ </h4>
            <button className='joinPartyBtn'>Join Party</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PartyCard;
