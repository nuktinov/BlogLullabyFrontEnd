import React from 'react';
import checkOnline from '../../../../../../logicElements/checkOnline'
import { dateFormatter2 } from '../../../../../../logicElements/dateFormatter'

export default function TextInfo({ profile }) {
  let activeStatus;
  if(!checkOnline(profile.lastVisit).localeCompare("online"))
    activeStatus = "online"
  else 
    activeStatus = "Last visit at " + dateFormatter2(profile.lastVisit)
  return (
    <div className="textInfo">
      <span> {profile.username} </span>
      <span> {activeStatus} </span>
      <span> {profile.firstName} {profile.lastName}</span>
      <span> {profile.city} </span>
    </div>
  )
}