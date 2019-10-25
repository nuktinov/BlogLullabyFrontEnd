import React, { useState } from "react"
import Filtering from './Filtering'
import Sorting from './Sorting'
import SearchText from './SearchText'
import './FilterPanel.css'

export default function FilterPanel({ sendCriterion }) {
    const [criterion, setCriterion] = useState({
        sortingBy: 0,
        filterBy: null,
        searchText: ''
    });

    function submit(e) {
        e.preventDefault();
        sendCriterion(criterion)
    }

    function changing(e) {
        let object = { 
            ...criterion, 
            [e.target.name]: e.target.value == "null" ? null : e.target.value 
        };
        setCriterion(object);
    }

    return (
        <form className='filterPanel' onSubmit={submit}>
            <label>
                Sorting:
                <select name='sortingBy' onChange={changing}>
                    <option value="0" >Popular</option>
                    <option value="1">Newer</option>
                    <option value="2">Older</option>
                </select>
            </label>
            <label>
                Filtering:
                <select name="filterBy" onChange={changing}>
                    <option value="null">No</option>
                    <option value="0">By title</option>
                    <option value="1">By author</option>
                </select>
            </label>
            {criterion.filterBy &&
                <label>
                    Searching:
                    <input 
                        type="text" 
                        name="searchText"
                        value={criterion.searchText} 
                        onChange={changing}/>
                </label>
            }
            <input type="submit" value="Search" className="saveBtn"/>
        </form>
	)
}


/*
<Sorting setSorting={(field) => changing(field)}/>
                <Filtering setFiltering={(field) => changing(field)} />
                {criterion.filterBy && 
                <SearchText 
                    setSearchText={(field) => changing(field)}
                    searchText={criterion.searchText}
                />}
                */