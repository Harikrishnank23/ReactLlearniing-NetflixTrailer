import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import "./RowPoster.css";
import axios from "axios";
import { apiKey, baseUrl, imageUrl } from "../../constants/constants";
const RowPoster = (props) => {
  const [movies, setMovies] = useState([]);
  const [urlId, seturlId] = useState();

  useEffect(() => {
    // console.log(`${baseUrl}` + props.url);
    axios
      .get(`${baseUrl}` + props.url)
      .then((res) => {
        // console.log(res.data.results);
        setMovies(res.data.results);
      })
      .catch((err) => {
        // alert("network error");
      });
  }, []);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const handleMovie = (id) => {
    axios.get(`${baseUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`).then((res) => {
      if (res.data.results.length !== 0) {
        seturlId(res.data.results[0])
      } else {
        console.log("trailer not available");
      }
    })
    // console.log(id);
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? "smallposter" : "poster"}
            src={`${imageUrl + obj.backdrop_path}}`}
            alt="poster"
          />
        ))}
      </div>
      {urlId &&< Youtube videoId={urlId.key} opts={opts} />}
    </div>
  );
};

export default RowPoster;
