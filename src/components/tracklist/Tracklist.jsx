import React from 'react';
import './Tracklist.css';
import Track from '../track/Track.jsx';

function Tracklist({listResults, addTrack, removeTrack, remove}) {

  return (
    <div className="TrackList">
    {/* <!-- You will add a map method that renders a set of Track components  --> */}
    {/* Display track(s) here */}
    {listResults.map((track)=>
      <Track 
        track={track} 
        addTrack={addTrack}
        removeTrack={removeTrack}
        remove={remove}
      />
    )}
    </div>
  )
}

export default Tracklist