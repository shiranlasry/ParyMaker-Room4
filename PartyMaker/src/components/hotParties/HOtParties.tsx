
import './hOtParties.scss'
import { partiesSelector } from '../../features/parties/partiesSlice'
import { useAppSelector } from '../../app/hook'

import PartyCard from '../partyCard/PartyCard'

const HOtParties = () => {
 const parties = useAppSelector(partiesSelector);

  return (
    <div className="hot-parties">
      {parties && parties.map((party) => (
        <PartyCard key={party.party_id} party={party} />
      ))}
    </div>
  )
}

export default HOtParties
