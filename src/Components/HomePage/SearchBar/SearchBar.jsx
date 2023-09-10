import React from 'react'
import './SearchBar.scss';

const SearchBar = ({ searchText, setSearchText }) => {


    return (
        <div className='search-bar'>
            <input type="text" placeholder='Search by name , email or role' value={searchText} 
            onChange={(e) => setSearchText(e.target.value)}
            />
        </div>
    )
}

export default SearchBar