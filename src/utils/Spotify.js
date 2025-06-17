let accessToken = "";

// const Spotify stores function objects
const Spotify = {
    
    async getAccessToken(){   // getAccessToken Function Object creates the accessToken if not found

       const clientId = "e3a1d5bcce5a41adbdc2b9cc4f9f33bf"; // Replace with your Client ID
       const clientSecret = "b4d0f1b822534e3fb2aff869d84c901b"; // Replace with your Client Secret   

       // client_credentials used here (to fetch data)
       // no personalized activities or features are allowed
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
            }),
        });
    
        const data = await response.json();
        console.log(data.access_token)
        return data.access_token; // Returns the access token

    },
    async search(term){ // search Function Object takes in a term to search for

        if(term === null || term === undefined || term === "" )
            return;

        const accessToken = await Spotify.getAccessToken();
        
        // use client_credential request to access spotify data
        return await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${accessToken}`}
        })
        .then((response)=> response.json())
        .then((jsonResponse)=>{
            if(!jsonResponse)
                console.log("Response error");  // Response returned from spotify is erroneous

            return jsonResponse.tracks.items.map((t) => ({
                id: t.id,
                name: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                uri: t.uri
            }));
        })
    },
    savePlayList(name, tracksUris){     // savePlayList takes in the name and the Uri of the track to save

        if(!name || !tracksUris)
            return;

        const token = Spotify.getAccessToken();                                                             // Spotify.getAccessToken() remembers me, based on my ClientID
        const header = {Authorization: `Bearer ${token}`};
        let userId = "";
        // ! Implicit grant no longer applies for new Spotify apps as of 9th Apr 2025 :(
        // For future reference to incorporate Authorization Code Grants instead
        // refer to article: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow#request-user-authorization
        return fetch(`https://api.spotify.com/v1/me`, {headers: header})                                     // fetch my profile
                .then((response) => response.json())
                .then((jsonResponse)=>{
                    userId = jsonResponse.id;                                                               // process the response of my own ID
                    let playlistId = "";
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {                  // fetch playlist of my profile and store the name of my new playlist
                        headers: header, 
                        method: "post", 
                        body: JSON.stringify({name: name})})
                            .then((response)=> response.json())
                            .then((jsonResponse)=>{
                                playlistId = jsonResponse.id;
                                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { // fetch new playlist of my profile and store the songs
                                    headers: header,
                                    method: "POST",
                                    body: JSON.stringify({uris: tracksUris})
                                })
                            })
                });
    }
};
        
export {Spotify};