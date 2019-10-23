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

    function changing(field) {
        let object = { ...criterion, ...field };
        setCriterion(object);
        sendCriterion(object);
    }

    return (
			<div className='filterPanel'>
				<Sorting setSorting={(field) => changing(field)}/>
                <Filtering setFiltering={(field) => changing(field)} />
                {criterion.filterBy && 
                <SearchText 
                    setSearchText={(field) => changing(field)}
                    searchText={criterion.searchText}
                />}
			</div>
	)
}