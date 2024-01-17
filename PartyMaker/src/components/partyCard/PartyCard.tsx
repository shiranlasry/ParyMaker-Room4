// PartyCard.jsx
import React, { useEffect, useState } from 'react';
import { Party } from '../../types-env';
import './partyCard.scss';
import axios from 'axios';

type PartyCardProps = {
  party: Party;
};

const PartyCard: React.FC<PartyCardProps> = ({ party }) => {
  const [imgurl, setImgurl] = useState("");

  // useEffect(() => {
  //   const getUrl = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.REACT_APP_IMG_URL}/${party.party_img_name}`
  //       );
  //       console.log(response.data);
  //       setImgurl(response.data);
  //     } catch (error) {
  //       console.error('Error fetching image:', error);
  //     }
  //   };

  //   getUrl();
  // }, [party.party_img_name]);

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
          {/* {party.party_img_name && (
            <img
              src={imgurl}
              alt={party.party_name}
              className="party-image"
            />
          )} */}
          <button>Join Party</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PartyCard;
