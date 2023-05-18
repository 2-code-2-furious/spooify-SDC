import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "../Player/Player";
import HeaderImage from "../HeaderImage/HeaderImage";
import Featuring from "../Featuring/Featuring.jsx";
import Discography from "../Discography/Discography";
import Sidebar from "../sidebar/Sidebar.jsx";
import FansLike from "../FansLike/FansLike";
import PlaylistPage from "../PlaylistPage/PlaylistPage";

const Dashboard = (props) => {
  const accessToken = useAuth(props.code);
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    const url = `http://localhost:4000/api/playlists/1`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        let tracks = [];
        for (let i = 0; i < data.length; i++) {
          tracks.push(data[i].track_id);
          console.log(data[i].track_id);
        }
        setFavoriteSongs(tracks);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const url = `http://localhost:4000/api/artists/0TnOYISbd1XYRBk9myaseg`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setArtist(data[0]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (artist) {
      console.log(favoriteSongs);
      const url = `http://localhost:4000/api/artists/${artist.artist_id}/albums`;

      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setAlbums(data);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    }
  }, [artist]);

  return (
    <>
      {albums ? (
        <>
          <div className="main_body">
            {showPlaylist ? (
              <>
                <Sidebar
                  setShowPlaylist={setShowPlaylist}
                  favoriteSongs={favoriteSongs}
                />
                <PlaylistPage favoriteSongs={favoriteSongs} />
                <div>
                  <HeaderImage albums={albums} />
                </div>
              </>
            ) : (
              <>
                <Sidebar
                  setShowPlaylist={setShowPlaylist}
                  favoriteSongs={favoriteSongs}
                />
                <div>
                  <HeaderImage albums={albums} />
                  <Discography albums={albums}></Discography>
                  <FansLike />
                  <Featuring artist={artist} favoriteSongs={favoriteSongs} />
                </div>
              </>
            )}
          </div>
          <Player accessToken={accessToken} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Dashboard;
