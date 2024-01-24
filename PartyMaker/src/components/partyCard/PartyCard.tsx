// PartyCard.jsx
import React, { useEffect } from 'react';
import { Party } from '../../types-env';
import './partyCard.scss';
import { useNavigate } from 'react-router-dom';

type PartyCardProps = {
  party: Party;
};

const PartyCard: React.FC<PartyCardProps> = ({ party }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleMoreDetails = () => {
   
    navigate(`/partyPage/${party.party_id}`);
  }
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3');
  };
  return (
    <div className="partyCard">
      {party ? (
        <div className='partyContent'>
          <h2 className='partyName'>{party.party_name}</h2>
          <div className="cardBody">
            <div className="imageOverlay" style={{ backgroundImage: `url(data:image/png;base64,${party.party_img_data})` }}>
              {party.party_date !== null ? (
                <div className='partyDetails'>
                  <p>{party.category_description} | {party.party_location} | {formatDate(party.party_date.toString())}</p>
                </div>
              ) : (
                <p>Date: Not available</p>
              )}
            </div>
          </div>
          <div className="party-description">
            <h4>{party.party_description}</h4>
            <h4>{party.party_price}₪ </h4>
             <button className='joinPartyBtn' onClick={handleMoreDetails}>More Details</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PartyCard;