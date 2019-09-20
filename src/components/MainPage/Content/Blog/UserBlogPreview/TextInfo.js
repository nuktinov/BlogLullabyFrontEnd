import React from 'react';
import checkOnline from '../../../../../logicElements/checkOnline'
import { dateFormatter2 } from '../../../../../logicElements/dateFormatter'

export default function TextInfo({ profile }) {
  let activeStatus;
  let statusColor;
  if(!checkOnline(profile.lastVisit).localeCompare("online")) {
    activeStatus = "Online"
    statusColor = "green"
  }
  else {
    activeStatus = "Last visit at " + dateFormatter2(profile.lastVisit)
    statusColor = "gray"
  }
  return (
    <div className="textInfo">
      <span> {profile.username} </span>
      <span style={{color: statusColor}}> {activeStatus} </span>
      <span> {profile.firstName} {profile.lastName}</span>
      <span> {profile.city} </span>
      <span> Total visits: {profile.totalVisits} </span>
    </div>
  )
}