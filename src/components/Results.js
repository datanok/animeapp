import React from 'react';
import Result from './Result';
import img from '../sorry.gif';

function Results({ results, openPopup, searched, nores }) {
 
  return (
    <section className="results">
      {searched && nores ? (
        <div className='no-result'>
          <h2>No Results Found</h2>
          <img src={img} alt="No results found" />
        </div>
      ) : (
        results.map((result) => (
          <Result key={result.mal_id} result={result} openPopup={openPopup} />
        ))
      )}
    </section>
  );
}
  
export default Results
