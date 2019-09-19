import React from 'react';
import Avatar from '../../../../Common/Avatar/Avatar'
import './UserBlogPreview.css'

export default function UserBlogPreview({ profile }) {
    console.log(profile)
    return (  
        <div className="userBlogPreview">
            <Avatar profile={profile} />
            <span> {profile.username}</span>    
        </div>
    )
}