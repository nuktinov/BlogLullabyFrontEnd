import React from 'react';
import {Link} from 'react-router-dom'
import MessagePreview from '../Message/MessagePreview'

function DialogPreview ({ dialog }) {
    return (
        <div className='dialogPreview'>
            <Link to={`/dialog/${dialog.id}`}>
			    <h5>{dialog.title}</h5>
            </Link>
			<MessagePreview message={dialog.lastMessage} />
		</div>
    )
};

export default DialogPreview;