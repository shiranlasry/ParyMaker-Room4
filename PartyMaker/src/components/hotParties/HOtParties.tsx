
  import './HotParties.scss'
  import { partiesSelector } from '../../features/parties/partiesSlice'
  import { useAppSelector } from '../../app/hook'

  import PartyCard from '../partyCard/PartyCard'
  import { useEffect } from 'react'
import { Party } from '../../types-env'

  const HotParties = () => {

  const parties = useAppSelector(partiesSelector) || []; // or provide a default value
  const groupedParties: Record<string, Party[]> = parties.reduce(
    (acc, party) => {
      const category = party.category_description;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(party);
      return acc;
    },
    {} as Record<string, Party[]>
  );
  useEffect (()=>{
  
  },[])
  return (
    <div className="hot-parties">
      {/* Render each category separately */}
      {Object.entries(groupedParties).map(([category, categoryParties]) => (
        <div key={category} className="category-container">
          <h2 className="category-title">{category}</h2>
          <div className="category-parties">
            {categoryParties.map((party) => (
              <PartyCard key={party.party_id} party={party} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotParties;