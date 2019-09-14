import React from "react"

function Filtering({ setFiltering }) {

    function onChange(e) {
        e.preventDefault();
        setFiltering({[e.target.name]: e.target.value == "null" ? null : e.target.value})
    }
    	return (
			
				<form onChange={onChange}>
                     <label>
                        Filtering:
                        <select name="filterBy">
                            <option value="null">No</option>
                            <option value="0">By title</option>
                            <option value="1">By author</option>
                        </select>
                    </label>
                </form>
			
		)
}

export default Filtering;