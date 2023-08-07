import React, { useEffect, useState } from "react";
import axios from "./axios";
import './Row.css';
import YouTube from "react-youtube";


const imgUrl="https://image.tmdb.org/t/p/original/";

function Row({title,fetchUrl,isLargerRow}){

    const [movies,setMovies]=useState([])
    const [trailerUrl,setTrailerUrl]=useState("")

    useEffect(()=>{
        async function fetchData(){

            const request=await axios.get(fetchUrl,{
                    headers:{
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTYxNDU4YTYxNDNiODU4ODY4YzZmMWMyNjg4NWQ2MiIsInN1YiI6IjY0OTlhNjgyYjM0NDA5MDBmZmVkNTkwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-zs0Eop0Zdxc1QyOOt_yXAP-TsvIQFJfGTnZ_ByxdIU"
                    } 
            });
           // console.log(fetchUrl);
            setMovies(request.data.results)
            return request
        }
        fetchData(); 
    },[fetchUrl])
   // console.log(movies)
  // console.table(movies);

  function fetchVideoLink(videoId) {

    const url = `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=8789b2e1805f257e5339cb972533b290`;

    axios

      .get(url)

      .then((res) => {

        if (res.data.results.length !== 0)

          console.log(res.data.results[0]?.key);

        setTrailerUrl(res.data.results[0]?.key);

      })

      .then((movieKey) => movieKey);

  }



  const handleClick = (movie) => {

    if (trailerUrl) {

      setTrailerUrl("");

    } else {

      fetchVideoLink(movie.id);

    }

  };


        const opts={
            height:"390",width:"100%",
            playerVars:{
                autoplay:1,
            },
        };

        /*const handleClick=(movie)=>{

            if(trailerUrl)
            {
                setTrailerUrl("");
            }
            else{
                movieTrailer(movie?.name|| "")
                .then((url)=>{
                    const urlparams=new URLSearchParams(new URL(url)).search;
                    setTrailerUrl(urlparams.get('v'));
                })
                .catch((err)=>console.log(err));
            }
        }
*/
    return(
        <div className="row">
            
            <h2>
                {title}
            </h2>
            <div className="row__posters">
               {movies.map((movie) =>(
                    <img key={movie.id} 
                    onClick={()=>handleClick(movie)}
                    className={`row__poster ${isLargerRow && 'row__posterlarge'}`}
                    src={`${imgUrl}${isLargerRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name}/>
                
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
            
        </div>
    )
}

export default Row;



























