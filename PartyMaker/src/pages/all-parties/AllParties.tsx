

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import NavBar from '../../components/navBar/NavBar'
import PartyCard from '../../components/partyCard/PartyCard'
import { getAllParties } from '../../features/parties/partiesAPI'
import { partiesSelector } from '../../features/parties/partiesSlice'
import './allParties.scss'

const AllParties = () => {
const parties = useAppSelector(partiesSelector) || []; 
const [searchTerm, setSearchTerm] = useState("");
const dispatch = useAppDispatch();
useEffect(() => {
    
  if (!parties.length) {
    dispatch(getAllParties());
  }
},[]);
const filteredParties = parties?.filter(
    (party) =>
      party.party_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (party.party_date &&
        party.party_date.toString().includes(searchTerm.toLowerCase()))
  );


return (
  <div className="all-parties">
    <NavBar />  
    <h1 className="all-parties-title">All Parties</h1>
    <input
        className="adminSearch"
        type="text"
        placeholder="Search by name or date..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    <div className="parties-container">
     
    {filteredParties &&
        filteredParties.map((party) => (
          <div className="allPartyCard">
        
              <PartyCard key={party.party_id} party={party} />

          </div>
        ))}
      </div>
  </div>
);
};

export default AllParties;