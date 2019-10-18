import React from 'react';
import TextInput from '../../../../Common/TextInput/TextInput'
import TextArea from '../../../../Common/TextArea/TextArea'

export default function TextFieldsUpdating({ fields, textChange, submit, usernameSubmit }) {

    const input = (text) => (
        <TextInput 
            span={text}
            name={text.toLowerCase().slice(0,-1)}
            value={fields[text.toLowerCase().slice(0,-1)]}
            onChange={textChange} 
        />
    )

    return (
        <div className="textFieldsUpdating">
            <form onSubmit={usernameSubmit}>
                {input("Username:")}
                <input type="submit" value="Save" className="saveBtn"/>
            </form>
            <form className="userBlogTextUpdatingForm"
                onSubmit={submit}>
                {input("Firstname:")}
                {input("Lastname:")}
                {input("Specialization:")}
                {input("City:")}
                <span>Description:</span>
                <TextArea 
                    name="description"
                    value={fields["description"]}
                    onChange={textChange}
                />
                <input type="submit" value="Save" className="saveBtn"/>
            </form>
        </div>
    )
}