import React, { useState } from "react";
import axios from "axios";

import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";

import { FaGithub } from "react-icons/fa";

function App() {
  const [nores, setRes] = useState(true);
  const [searched, setSearched] = useState(false);
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
    nores: false,
  });
  const apiurl = "https://api.jikan.moe/v4";
  const [genreMap] = useState({
    Action: 1,
    Adventure: 2,
    Cars: 3,
    Comedy: 4,
    Dementia: 5,
    Demons: 6,
    Mystery: 7,
    Drama: 8,
    Ecchi: 9,
    Fantasy: 10,
    Game: 11,
    Hentai: 12,
    Historical: 13,
    Horror: 14,
    Kids: 15,
    Magic: 16,
    Martial_Arts: 17,
    Mecha: 18,
    Music: 19,
    Parody: 20,
    Samurai: 21,
    Romance: 22,
    School: 23,
    Sci_Fi: 24,
    Shoujo: 25,
    Shoujo_Ai: 26,
    Shounen: 27,
    Shounen_Ai: 28,
    Space: 29,
    Sports: 30,
    Super_Power: 31,
    Vampire: 32,
    Yaoi: 33,
    Yuri: 34,
    Harem: 35,
    Slice_of_Life: 36,
    Supernatural: 37,
    Military: 38,
    Police: 39,
    Psychological: 40,
    Thriller: 41,
    Seinen: 42,
    Josei: 43
  });


  const search = async (e) => {
    if (e.key === "Enter") {
      const searchQuery = state.s.trim();
      if (!searchQuery) {
        setState((prevState) => ({
          ...prevState,
          nores: true,
          searched: true,
          results: [],
        }));
      } else {
        setSearched(true);
        try {
          const { data } = await axios(`${apiurl}/anime?q=${searchQuery}`);
          const results = data?.data || [];
          setState((prevState) => ({
            ...prevState,
            results,
            searched: true,
            nores: results.length === 0,
          }));
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleInput = (e) => {
    let s = e.target.value;
    setSearched(false);

    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const openPopup = (mal_id) => {
    axios
      .get(`${apiurl}/anime/${mal_id}`)
      .then(({ data }) => {
        const selected = data.data;
        setState((prevState) => ({ ...prevState, selected }));
      })
      .catch((error) => {
        console.error("Error fetching anime details:", error);
        setState((prevState) => ({ ...prevState, selected: {} }));
      });
  };

  const closePopup = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  const handleGenreClick = async (genre) => {
    try {
      const { data } = await axios(
        `https://api.jikan.moe/v4/anime?genres=${genreMap[genre]}`
      );
      const results = data?.data || []; 
      setState((prevState) => ({
        ...prevState,
        results,
        searched: true,
        nores: results.length === 0,
      }));
    } 
   
    catch (error) {
      console.error(error);
    }
    closePopup();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Animetastic</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <button onClick={() => handleGenreClick(1)}>Action</button>
        <Results
          results={state.results}
          openPopup={openPopup}
          state={state}
          searched={state.searched}
          nores={state.nores}
          handleGenreClick={handleGenreClick}
        />

        {typeof state.selected.title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup}  handleGenreClick={handleGenreClick}/>
        ) : (
          false
        )}
      </main>

      <footer>
        <p>
          Project By <a href="https://github.com/datanok">Tanmay Patil</a>{" "}
        </p>
        <a href="https://github.com/datanok/animeapp" className="git">
       
          <FaGithub />
        </a>
      </footer>
    </div>
  );
}

export default App;
