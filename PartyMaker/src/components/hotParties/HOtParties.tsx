import React from 'react'
import './hOtParties.scss'
import { partiesSelector } from '../../features/parties/partiesSlice'
import { useAppSelector } from '../../app/hook'
import { partiesData } from '../../utils/data'
import PartyCard from '../partyCard/PartyCard'

const HOtParties = () => {
  const parties = useAppSelector(partiesSelector)


  return (
    <div className="hot-parties">
      {partiesData.map((party) => (
        <PartyCard key={party.Partyid} party={party} />
      ))}
    </div>
  )
}

export default HOtParties
