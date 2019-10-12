import React, { useState } from 'react';
import TextInput from '../../../Common/TextInput/TextInput'
import './FilterPanel.css'

export default function Filtering({ setFilter }) {

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
            setCriterion({...criterion, online: !criterion.online})
        else
            setCriterion({...criterion, [e.target.name]: e.target.value })
    }
    let input = document.querySelector('.filtering > .textInput');
    let checkbox = document.querySelector('.filtering > .onlineCheckBox');
    if(input != null && checkbox != null) {
        checkbox.style.width = input.offsetWidth + "px";
    }
    function inputField(name){
        return <TextInput
            span={name + ":"}
            name={name.toLowerCase()}
            value={criterion[name.toLowerCase()]}
            onChange={change}
        />
    }

    return (
	    <form className="filtering" onSubmit={submit}>
            <span>Filters</span>
            {inputField("Username")}
            {inputField("Fullname")}
            {inputField("City")}
            <span className="onlineCheckBox">
                Online:
                <input name="online" type="checkbox" onChange={change}></input>
            </span>
            <input type="submit" value="Search" className="saveBtn"/>
        </form>
	)
}