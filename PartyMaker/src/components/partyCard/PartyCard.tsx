// PartyCard.jsx
import React from 'react';
import { Party } from '../../types-env';
import './partyCard.scss';

type PartyCardProps = {
    party: Party;
  };
  
  const PartyCard: React.FC<PartyCardProps> = ({ party }) => {
    return (
        <div className="party-card">
        <img src={party.partyImage} alt={party.partyName} className="party-image" />
        <div className="party-details">
          <h2>{party.partyName}</h2>
          <p>Date: {party.partyDate}</p>
          <p>Time: {party.partyTime}</p>
          <p>Location: {party.partyLocation}</p>
          <p>Type: {party.partyType.partyTypeName}</p>
          <p>Creator: {party.partyCreator.firstName} {party.partyCreator.lastName}</p>
          <p>Participants: {party.partyParticipants.length}</p>
          <p>Things to bring: {party.thingsToBring?.join(', ')}</p>
        </div>
        <button className="join-button">Join Party</button>
      </div>
    );
  };
  
  export default PartyCard;
