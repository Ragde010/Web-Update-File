import React from 'react'
import { FiSearch } from 'react-icons/fi';

const Search = ({ searchTerm, setSearchTerm, handleSearch })  => {
  return (
    <div className="search-bar">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button onClick={handleSearch}>
      <FiSearch />
    </button>
  </div>
  )
}

export default Search