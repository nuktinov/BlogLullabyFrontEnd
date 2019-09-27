import React, { useState } from 'react';
import TextInput from '../../../Common/TextInput/TextInput'
import './FilterPanel.css'

function Filtering({ setFilter, filters }) {

    const [criterion, setCriterion] = useState({
        username: '',
        fullName: '',
        city: '',
        online: false
    });

    function submit(e) {
        e.preventDefault();
        setFilter(criterion)
    }
    function change(e) {
        if(e.target.name === "online") 
            setCriterion({online: !criterion.online})
        else
            setCriterion({ [e.target.name]: e.target.value })
    }
    let input = document.querySelector('.filtering > .textInput');
    let checkbox = document.querySelector('.filtering > .onlineCheckBox');
    if(input != null && checkbox != null) {
        checkbox.style.width = input.offsetWidth + "px";
    }
    return (
	    <form className="filtering" onSubmit={submit}>
            <span>Filters</span>
            <TextInput
                span="Username:"
                name="username"
                value={criterion.username}
                onChange={change}
            />
            <TextInput
                span="Fullname:"
                name="fullName"
                value={criterion.fullName}
                onChange={change}
            />
            <TextInput
                span="City:"
                name="city"
                value={criterion.city}
                onChange={change}
            />
            <span className="onlineCheckBox">
                Online:
                <input name="online" type="checkbox" onChange={change}></input>
            </span>
            <input type="submit" value="Search" className="saveBtn"/>
        </form>
	)
}

export default Filtering;