import React from 'react'

//check if trailer is available
function Ytembed({ embedUrl }) {
  if (embedUrl) {
    
    return <iframe src={embedUrl} width="100%" height="400px" frameborder="0" ></iframe>;
  }
  return <h4>No Trailer Available</h4>;
}
function Othertitles({titles}){
  if(Array.isArray(titles) && titles.length)
  return  <h5>Other titles: {titles.map((title) => (
					
    <span className='other-titles'>{title} </span>
))}  </h5>;
else
return <h5>Other titles: <span className='other-titles'>Not available</span>  </h5>

}

function Popup({ selected, closePopup }) {
	console.log(selected);
	var desc = 'No Summary Available';
	if(selected.synopsis){
		desc = selected.synopsis;
	}
	
	return (
		<section className="popup">
			<div className="content">
				
				<main>
  <div class="container">
    <div class="grid second-nav">
      <div class="column-xs-12">
        <nav>
          <ol class="breadcrumb-list">
		  <li class="breadcrumb-item">{selected.rating}</li>
		  {selected.genres.map((genre) => (
					
					<li class="breadcrumb-item">{genre.name}</li>
    ))}  
     <li class="breadcrumb-item">{selected.type}</li>
         
          </ol>
        </nav>
      </div>
    </div>
    <div class="grid product">
      <div class="column-xs-12 column-md-4">
        <div class="product-gallery">
          <div class="product-image">
            <img class="active" src={selected.images.jpg.image_url}></img>
          </div>
        
        </div>
      </div>
      <div class="column-xs-12 column-md-8">
        <h3>{selected.title}</h3>
       <Othertitles titles={selected.title_synonyms}/>
   
        <div class="description">
			<p>{desc}</p>
          </div>
          
      
      </div>
    </div>
    <div class="grid related-products">
      <div class="column-xs-12">
        <h3>Trailer</h3>

      </div>
      <div class="column-xs-12" >
      <Ytembed embedUrl = {selected.trailer.embed_url}/>
      </div>
      <div class="column-xs-12 close-box" >
      <button className="close" onClick={closePopup}>Close</button>
      </div>
     
    </div>

				
  </div>
</main>
			</div>

		</section>
	)
}

export default Popup