import React, { useState } from 'react';

export default function usernameUpdating({ submit, username }) {
  const [name, setName] = useState(username)

    label = (viewString, inputName, type = "text") => (
        <label>
          {viewString}:
          <input 
            type={type} 
            name={inputName}
            value={this.state[inputName] ? this.state[inputName] : ''}
            onChange={this.textChange} />
        </label>
      )

    return (
        <form className="userBlogTextUpdatingForm"
            onSubmit={submit}>
            {label("Username", "username")}
            <input type="submit"  value="Change username"/>
        </form>
    )
}