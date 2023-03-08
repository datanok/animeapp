import React from "react";

//check if trailer is available
function Ytembed({ embedUrl }) {
  if (embedUrl) {
    return (
      <iframe
        src={embedUrl}
        width="100%"
        height="400px"
        frameborder="0"
      ></iframe>
    );
  }
  return <h4>No Trailer Available</h4>;
}
function Othertitles({ titles }) {
  if (Array.isArray(titles) && titles.length) {
    return titles.map((title) => <span class="value"> {title}</span>);
  } else return <span>-</span>;
}

//gets studios and producers of anime and unpacks the array
function Producers({ animeProducers }) {
  if (animeProducers.length) {
    return animeProducers.map((producer) => (
      <span>
        <a class="value" href={producer.url}>
          {" "}
          {producer.name}{" "}
        </a>
      </span>
    ));
  } else return <span>-</span>;
}

function Popup({ selected, closePopup ,handleGenreClick}) {
  console.log(selected);
  var desc = "No Summary Available";
  if (selected.synopsis) {
    desc = selected.synopsis;
  }

  return (
    <section className="popup">
      <button class="close-button" onClick={closePopup}>&times;</button>
      <div className="content">
        <main>
          <div class="container">
            <div class="grid second-nav">
              <div class="column-xs-12">
                <nav>
                  <ol class="breadcrumb-list">
                    <li class="breadcrumb-item">{selected.rating}</li>
     
                    <li class="breadcrumb-item">{selected.type}</li> 
                    {selected.genres.map((genre) => (
                    <button className="button-60" key={genre.name} onClick={() => handleGenreClick(genre.name)}>
                      {genre.name}
                      </button>
                      ))}
                  </ol>
                </nav>
              </div>
            </div>
            <div class="grid product">
              <div class="column-xs-12 column-md-3">
                <div class="product-gallery">
                  <div class="product-image">
                    <img
                      class="active"
                      src={selected.images.jpg.image_url}
                    ></img>
                  </div>
                </div>
              </div>
              <div class="column-xs-12 column-md-5">
                <h3>{selected.title}</h3>

                <div class="description">
                  <p>{desc}</p>
                </div>
              </div>
              <div class="column-xs-12 column-md-4">
                <div class="anime-info">
                  <div class="anime-info">
                    <div class="field field-title">
                      <span class="field-head">Japanese: </span>
                      <span class="value">{selected.title_japanese}</span>
                    </div>

                    <div class="field field-title">
                      <span class="field-head">Synonyms: </span>
                      <span class="value">
                        {" "}
                        <Othertitles titles={selected.title_synonyms} />
                      </span>
                    </div>

                    <div class="field field-title">
                      <span class="field-head">Aired: </span>
                      <span class="value">{selected.aired.string}</span>
                    </div>

                    <div class="field field-title">
                      <span class="field-head">Status: </span>
                      <span class="value">{selected.status}</span>
                    </div>
                    <div class="field field-title">
                      <span class="field-head">Score:</span>
                      <span class="value"> {selected.score}</span>
                    </div>

                    <div class="field field-title">
                      <span class="field-head">Studios:</span>
                      <Producers animeProducers={selected.producers} />
                    </div>

                    <div class="field field-title">
                      <span class="field-head">Producers:</span>
                      <Producers animeProducers={selected.studios} />
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div>
            </div>
            <div class="grid related-products">
              <div class="column-xs-12">
                <h3>Trailer</h3>
              </div>
              <div class="column-xs-12">
                <Ytembed embedUrl={selected.trailer.embed_url} />
              </div>
             {/*  <div class="column-xs-12 close-box">
                <button className="close" onClick={closePopup}>
                  Close
                </button>
              </div> */}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Popup;
