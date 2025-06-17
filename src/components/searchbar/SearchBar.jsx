import React from 'react'
import "./SearchBar.css"

function SearchBar({onSearch, runSearch, searchTerm}) {

  function handleSearchChange(event){
    onSearch(event.target.value);
  }

  return (

    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" 
      onChange={handleSearchChange}
      value={searchTerm}/>
      <button className="SearchButton"
      onClick={runSearch}
      onSearch>SEARCH</button>
    </div>
  )
}

export default SearchBar