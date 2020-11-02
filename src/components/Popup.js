import React from 'react'

function Popup({ selected, closePopup }) {
	const year = selected.end_date;
	console.log(year);
	return (
		<section className="popup">
			<div className="content">
				<h2>{ selected.title } <span>{ selected.start_date }</span></h2>
				{/* <p className="rating">Rating: {selected.score}</p> */}
				<div className="col_1">
				<ul className="movie-gen">
                <li>{selected.rating}  | </li>
				<span className="label">Type:</span>
                <li>{selected.type}  | </li> 
				<span className="label">Genre :</span>
				{selected.genres.map((person) => (
					<li><em>{person.name}</em></li>
    ))}  
				
	<li>{year}</li>
              </ul>
			  </div>
				
			  <br></br>
			  
				<div className="plot">
					<img src={selected.image_url} />
					<div>
              		<h5>SUMMARY</h5>
					<p>{selected.synopsis}</p>
					</div>
				</div>
				<button className="close" onClick={closePopup}>Close</button>
			</div>
		</section>
	)
}

export default Popup