import React, { useEffect, useState } from "react";
import axios from "axios";
import Result from './Result';
import Search from "./Search";

const HomePage = (openPopup, props) => {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);

  useEffect(() => {
    const getTrendingAnime = async () => {
      const response = await axios.get(
        "https://api.jikan.moe/v4/top/anime"
      );
      setTrendingAnime(response.data.data);
    };
    const getPopularAnime = async () => {
      const response = await axios.get(
        "https://api.jikan.moe/v4/anime?sort=popularity_desc"
      );
      setPopularAnime(response.data.data);
    };
    getTrendingAnime();
    getPopularAnime();
  }, []);

  return (
    <div>
    
      <h1>Trending Anime</h1>
      <ul>
      {trendingAnime.map((result) => (
          <Result key={result.mal_id} result={result} openPopup={openPopup} />
        ))}
     
      </ul>
      <h1>Popular Anime</h1>
      <ul>

      </ul>
    </div>
  );
};

export default HomePage;
