import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Result({result, openPopup}) {
    var year  = new Date (result.start_date).getFullYear();
    
    
    return (
        <div className="result" onClick={() => openPopup(result.mal_id)}>
            <img src={result.image_url} />
            <h3>{result.title}</h3> 
            <span><i className="fas fa-star"></i>{result.score}<span className="year">{year}</span></span>
            
        
        </div>
    )
}

export default Result
