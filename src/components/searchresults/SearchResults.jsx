import React from 'react';
import Tracklist from '../tracklist/Tracklist';
import './SearchResults.css';

// add track should be received by SearchResults and passed on to addTrack={addTrack}

function SearchResults({searchResults, addTrack}) {
  return (
      <div className="SearchResults">
        <h2>Result</h2>
        {/* Display track(s) here */}
        <Tracklist 
          listResults={searchResults}
          addTrack={addTrack}
          remove={false}
        />
      </div>
  )
}

export default SearchResults