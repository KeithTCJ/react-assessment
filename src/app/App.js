import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar.jsx';
import SearchResults from '../components/searchresults/SearchResults.jsx';
import Playlist from '../components/playlist/Playlist.jsx';
import { Spotify } from '../utils/Spotify.js';

function App() {

  // state management (useState() hook) - to create an Array called searchResults
  const [searchResults, setSearchResults] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playListName, setPlayListName] = useState("New PlayList");
  const [searchTerm, setSearchTerm] = useState("");

  // sideEffect (Document Load) - called useEffect hook
  // The blank bracket refers to running this hook only once
  useEffect(() => {
    //Spotify.getAccessToken(); -> not needed

    // populate searchResults with defaultValues
    setSearchResults([
      {
        id: 1,
        name: "Track one",
        artist: "Track 1 Artist",
        album: "Track 1 Album",
        uri: "Track 1 Uri"
      },
      {
        id: 2,
        name: "Track 2",
        artist: "Track 2 Artist",
        album: "Track 2 Album",
        uri: "Track 2 Uri"
      },
      {
        id: 3,
        name: "Track 3",
        artist: "Track 3 Artist",
        album: "Track 3 Album",
        uri: "Track 3 Uri"
      },

      {
        id: 4,
        name: "Playlist 1",
        artist: "Playlist 1 Artist",
        album: "Playlist 1 Album",
        uri: "Playlist 1 Uri"
      },
      {
        id: 5,
        name: "Playlist 2",
        artist: "Playlist 2 Artist",
        album: "Playlist 2 Album",
        uri: "Playlist 2 Uri"
      },
    ]);
    
    setPlayListTracks([]);

  },[]); 
  
  // passed as a prop to SearchBar 
  // invokes the Spotify.search() 
  function search(term = ""){
    setSearchTerm(term);
  }
  
  async function runSearch(){
    // TODO - run the search function with Spotify
    const results = await Spotify.search(searchTerm);
    setSearchResults(results);
    
  }

  // passed as a prop to SearchResults 
  function addTrack(track){
    // only add a track if passed-in track id does not exist yet in the list
    const findTrack = playListTracks.find(currentTrack => currentTrack.id === track.id);

    // only then do we add the track
    if(!findTrack)
    setPlayListTracks([...playListTracks, track]);

    setSearchResults(
      searchResults.filter(currentTrack=>currentTrack.id !== track.id)
    )
  }

  // passed as a prop Playlist
  function removeTrack(track){

    // remove the track from playListTrack
    const findTrack = playListTracks.find(currentTrack => currentTrack.id === track.id);

    // append it to searchResults
    if(findTrack){
      setPlayListTracks(
        playListTracks.filter(currentTrack => currentTrack.id !== track.id)
      )
    };

    // move the track from playListTracks back to the search results
    setSearchResults([...searchResults, findTrack]);
    
  }

  // passed as a prop to PlayList (update playListName)
  function updatePlayListName(strName){
    setPlayListName(strName);
    
  }

  // passed as a prop to PlayList (to save the new playlist)
  function savePlayList(){

    // TO EXPLORE Spotify.savePlayList()
    // convert to using Authorization Code Grant

    // provide feedback that the playlist has been saved
    const savedPlayListName = playListName;
    const savedPlayListTracks = playListTracks.length;

    alert(`${savedPlayListName} is saved with ${savedPlayListTracks} tracks`);

    // Clear playListName and playListTracks
    setPlayListName("New PlayList");
    setPlayListTracks([]);
    setSearchTerm("");
  }

  // log data right before rendering (return html)
  // console.log(searchTerm);
 console.log(playListTracks);

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar
          // pass in data to search bar
          onSearch={search}
          runSearch={runSearch}
          searchTerm={searchTerm}
          />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults 
          searchResults={searchResults} 
          addTrack={addTrack}
          />
          {/* <!-- Add a Playlist component --> */}
          <Playlist 
            playListTracks={playListTracks}
            removeTrack={removeTrack}
            playListName={playListName}
            updatePlayListName={updatePlayListName}
            savePlayList={savePlayList}
        
            />
        </div>
      </div>
    </div>
  );
}

export default App;
