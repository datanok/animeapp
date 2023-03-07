import React from 'react';

function Search({ handleInput, search}) {
    return (
        <section className="search-wrapper">
            <input type="text" 
            placeholder="Search for an anime"
            className="searchbox"
            onChange={handleInput} 
            onKeyPress={search}
      
            />

        </section>
    )
}

export default Search
