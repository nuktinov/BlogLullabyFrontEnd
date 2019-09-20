import React from 'react';
import Avatar from '../../../../Common/Avatar/Avatar'
import TextInfo  from '../../UserBlog/UserProfile/TextInfo'
import './UserBlogPreview.css'

export default function UserBlogPreview({ profile }) {
    const profileInfo = {...profile, firstName: profile.fullName}
    return (  
        <div className="userBlogPreview">
            <Avatar profile={profile} />
            <TextInfo profile={profileInfo} />   
        </div>
    )
}