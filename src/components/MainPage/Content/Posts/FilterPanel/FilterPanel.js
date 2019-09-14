import React, { useState } from "react"
import Filtering from './Filtering'
import Sorting from './Sorting'
import SearchText from './SearchText'
import './FilterPanel.css'

function FilterPanel({ sendCriterion }) {
    const [criterion, setCriterion] = useState({
        sortingBy: 0,
        filterBy: null,
        searchText: ''
    });

    function changing(field) {
        let object = { ...criterion, ...field };
        setCriterion(object);
        sendCriterion(object);
        console.log(object)
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

export default FilterPanel;