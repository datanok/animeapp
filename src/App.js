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
  const apiurl = " https://api.jikan.moe/v4";

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
          const results = data?.data || []; //check if data property exists in the data object if yes then assign it to results or assign it an empty array
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Animetastic</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} state={state} searched={state.searched} nores={state.nores}/>

        {typeof state.selected.title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>

      <footer>
        <p>
          Project By <a href="https://github.com/datanok">Tanmay Patil</a>{" "}
        </p>
        <a href="https://github.com/datanok/animeapp" className="git">
          {" "}
          <FaGithub />
        </a>
      </footer>
    </div>
  );
}

export default App;
