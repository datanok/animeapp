import React, { useState } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup'
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
   const [state, setState] = useState({
    s:"",
    results: [],
    selected: {}

   });
  const apiurl = "https://docs.api.jikan.moe/";

  const search = (e) => {
    if(e.key === "Enter"){
      axios(apiurl + "/search/anime?q=" + state.s).then(({data}) => {
        let results =  data.results;
        
        setState(prevState => {
          return { ... prevState, results: results }
        })
        console.log(data);
      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
    
  }

  const openPopup = mal_id => {
    axios(apiurl + "/anime/" + mal_id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }
  const Footer = () => (
    <footer className="footer">
      <p>Some footer nonsense!</p>
    </footer>
  );
  return (
    <div className="App">
      <header className="App-header">
        <h1>Anime x2z</h1>
      </header>
      <main>
          <Search handleInput={handleInput} search={search} />

          <Results results={state.results} openPopup={openPopup} />

          {(typeof state.selected.title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}


      </main>
      <footer class='footer'> 
          <p>Project By <a href="https://github.com/datanok">Tanmay Patil</a>  </p><a href="https://github.com/datanok/animeapp" className="git">Github</a>      
      </footer>
      
    </div>
  );
}

export default App;
