import React from 'react';
import Avatar from '../../../Common/Avatar/Avatar'
import TextInfo  from './TextInfo'
import './UserBlogPreview.css'

export default function UserBlogPreview({ profile }) {
    const profileInfo = profile.fullName 
        ? {...profile, firstname: profile.fullName} 
        : profile
    return (  
        <div className="userBlogPreview">
            <Avatar profile={profile} />
            <TextInfo profile={profileInfo} />   
        </div>
    )
}