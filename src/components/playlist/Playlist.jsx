import React from 'react'
import './Playlist.css';
import Tracklist from '../tracklist/Tracklist.jsx'

function Playlist({playListTracks, removeTrack, playListName, updatePlayListName, savePlayList}) {

  function handleNameChange(e){   // e is same as event
    updatePlayListName(e.target.value);
  }

  return (

    <div className="Playlist">
      <input type="text" value={playListName} onChange={handleNameChange}/>
      {/* <!-- Add a TrackList component --> */}
      <Tracklist
        listResults={playListTracks}
        removeTrack={removeTrack}
        remove={true}
        />
      <button onClick={savePlayList} className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  )
}

export default Playlist
