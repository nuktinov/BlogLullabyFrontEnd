import React from "react"

function SearchText({ setSearchText, searchText }) {

    function onChange(e) {
        // сделать задержку где-то надо
        e.preventDefault();
        setSearchText({[e.target.name]: e.target.value})
    }

    return (
			<form >
                <label>
                    Searching:
                    <input 
                        type="text" 
                        name="searchText"
                        value={searchText} 
                        onChange={onChange}/>
                </label>
            </form>
	)
}

export default SearchText;