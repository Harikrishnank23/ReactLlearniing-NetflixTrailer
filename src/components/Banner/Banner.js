import React, { useEffect, useState } from "react";
import "./Banner.css";
import { apiKey, baseUrl, imageUrl } from "../../constants/constants";
import axios from "axios";
import YouTube from "react-youtube";
const Banner = () => {
  const [movie, setMovie] = useState();
  const [urlId, seturlId] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`
      )
      .then((res) => {
        // console.log(res.data.results[0]);
        setMovie(res.data.results[0]);
      });
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handlevedio = (id) => {
    axios
      .get(`${baseUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`)
      .then((res) => {
        if (res.data.results.length !== 0) {
          seturlId(res.data.results[0]);
        } else {
          console.log("trailer not available");
        }
      });
    // console.log(id);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})`,
      }}
      className="banner"
    >
      <div className="content">
        <h1 className="title">{movie ? movie.original_name : ""}</h1>
        <div className="bannerbuttons">
          <button
            className="button"
            onClick={() => {
              handlevedio(movie.id);
            }}
          >
            play
          </button>
          <button className="button">my list</button>
        </div>
        <h1 className="description">{movie ? movie.overview : ""}</h1>
      </div>
     
      <div className="fade"></div>
      
     
    
{ urlId && <YouTube videoId={urlId.key} opts={opts} /> }
    </div> 
     
  );
};

export default Banner;
