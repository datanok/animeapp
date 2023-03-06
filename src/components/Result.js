import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


function Result({result, openPopup}) {
    var year  = new Date (result.aired.from).getFullYear();
    console.log(result);
    
    
    return (
        <div className="result" onClick={() => openPopup(result.mal_id)}>
            <img src={result.images.jpg.image_url} />
            <div className="result-box">
            <div className='first-line'>
            <span><i className="fas fa-star"></i>{result.score}</span>
            <span className="year">{year}</span>
            <span>{result.type}</span>
            </div>
            
            <h3>{result.title}</h3> 
            </div>
        
        </div>
    )
}

export default Result
