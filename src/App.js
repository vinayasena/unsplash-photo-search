import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;



const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

//
//3QOUdXzDubQr89Ra-ux-v42cYas_Gl7B__tA3AW1s-8

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [searchterm, setSearchTerm] = useState("");

  const fetchImages = async () => {
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${searchterm}`;
    url = `${mainUrl}${clientID}${urlPage}`;
    if (searchterm) {
      url = `${searchUrl}${clientID}${urlQuery}${urlPage}`;
    }
    setLoading(true);
    const response = await fetch(url);
    let data = await response.json();
    if (searchterm) data = data.results;
    setPhotos((oldPhots) => {
      if (searchterm && page === 1) {
        return [...data];
      }
      if (searchterm) {
        return [...oldPhots, ...data];
      } else {
        return [...oldPhots, ...data];
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    let event = window.addEventListener("scroll", () => {
      const innerHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const documentBodyHeight = document.body.scrollHeight;

      if (!loading && innerHeight + scrollY >= documentBodyHeight) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });

    return () => {
      window.removeEventListener("scroll", event);
    };
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPage((page) => {
      if (page === 0) return 1;
      else return 0;
    });

    // fetchImages()
  };
  
  return (
    <main>
      <section className='app-info'>
        <h3>Search Unsplash for stock images</h3>
        <h5>Note: Please note that only 50 requests/hour are allowed by Unsplash.</h5>
      </section>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="Search unsplash..."
            className="form-input"
            name="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch className='icon'/> 
          </button>
          
        </form>
      </section>
      <section className='loading'>
      {loading && <Loader
        type="Rings"
        color="#00BFFF"
        height={50}
        width={50}
              
      />}
      </section>
      <section className="photos">

      
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={`${photo.id}_${index}`} {...photo} />;
          })}
        </div>
        
      </section>
    </main>
  );
}

export default App;
