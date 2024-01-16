
import './hOtParties.scss'
import { partiesSelector, partiesStatusSelector } from '../../features/parties/partiesSlice'
import { useAppSelector } from '../../app/hook'

import PartyCard from '../partyCard/PartyCard'
import { useEffect } from 'react'

const HOtParties = () => {
 const parties = useAppSelector(partiesSelector);
 const status = useAppSelector(partiesStatusSelector);

useEffect (()=>{
  debugger
  console.log("parties", parties)
  console.log("status", status)
},[])
  return (
    <div className="hot-parties">
      {parties && parties.map((party) => (
        <PartyCard key={party.party_id} party={party} />
      ))}
    </div>
  )
}

export default HOtParties
