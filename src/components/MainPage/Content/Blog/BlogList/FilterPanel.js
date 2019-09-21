import React from "react"
import TextInput from '../../../Common/TextInput/TextInput'
import './FilterPanel.css'

function Filtering({ setFilter, filters }) {
    let input = document.querySelector('.filtering > .textInput');
    let checkbox = document.querySelector('.filtering > .onlineCheckBox');
    if(input != null && checkbox != null) {
        console.log(input.offsetWidth)
        checkbox.style.width = input.offsetWidth + "px";
    }
    return (
	    <form className="filtering">
            <span>Filters</span>
            <TextInput
                span="Username:"
                name="username"
                value={filters.username}
                onChange={setFilter}
            />
            <TextInput
                span="Fullname:"
                name="fullName"
                value={filters.fullName}
                onChange={setFilter}
            />
            <TextInput
                span="City:"
                name="city"
                value={filters.city}
                onChange={setFilter}
            />
            <span className="onlineCheckBox">
                Online:
                <input name="online" type="checkbox" onChange={setFilter}></input>
            </span>
        </form>
	)
}

export default Filtering;