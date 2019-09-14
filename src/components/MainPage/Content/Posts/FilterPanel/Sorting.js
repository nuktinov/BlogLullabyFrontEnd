import React from "react"

function Sorting({ setSorting }) {

    function onChange(e) {
        e.preventDefault();
        setSorting({[e.target.name]: e.target.value})
    }
    	return (
			
				<form onChange={onChange}>
                    <label>
                        Sorting:
                        <select name='sortingBy'>
                            <option value="0" >Popular</option>
                            <option value="1">Newer</option>
                            <option value="2">Older</option>
                        </select>
                    </label>
                </form>
			
		)
}

export default Sorting;