import React, { useState } from "react";
import axios from "axios";

import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";

import { FaGithub } from "react-icons/fa";

function App() {
  const [searched, setSearched] = useState(false);
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });
  const apiurl = " https://api.jikan.moe/v4";

  const search = (e) => {
    if (e.key === "Enter") {
      setSearched(true);
      axios(apiurl + "/anime?q=" + state.s).then(({ data }) => {
        let results = data.data;

        setState((prevState) => {
          return { ...prevState, results: results };
        });
      });
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
    axios(apiurl + "/anime/" + mal_id).then(({ data }) => {
      let result = data.data;

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };
  const Footer = () => (
    <footer className="footer">
      <p>Some footer nonsense!</p>
    </footer>
  );
  return (
    <div className="App">
      <header className="App-header">
        <h1>Animetastic</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} state={state} searched={searched}/>

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
