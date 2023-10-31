import axios from "axios";
import { useEffect, useState } from "react";
import Singlecontent from "../../components/Singlecontent/singlecontent";
import CustomPagination from "../../components/Pagiantion/CustomPagiantion";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenre";
const Movies = () => {
    const [page, setpage]=useState(1);
    const [content, setContent]=useState([]);
    const [numberofpages, setnumberofpages]=useState();
    const [selectedgenres, setselectedgenres]=useState([]);
    const [genres,setGenres]=useState([]);
    const genreforURL=useGenres(selectedgenres);
    const fetchMov = async () => {
        const{data}= await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${'87e1657c60323127e94e31c497de5060'}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
    setContent(data.results);
    setnumberofpages(data.total_pages); 
    };
    useEffect(() => {
        fetchMov();
            // eslint-disable-next-line
    },[page,genreforURL])
    return(
    <div>
        <span className="pagetitle">TV Shows</span>
        <Genres
  type="tv" 
  selectedGenres={selectedgenres} 
  setSelectedGenres={setselectedgenres} 
  genres={genres} 
  setGenres={setGenres} 
  setPage={setpage} 
/>

        <div className="Trending">
               {
                content && content.map((c, index) => (
                    <Singlecontent
                        overview={c.overview}
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type="tv"
                        vote_average={c.vote_average}

                    />
                ))  
            }
            
            
        </div> 
        {numberofpages>1 && (
            <CustomPagination setpage={setpage} numberofPages={numberofpages} />
        )}
    </div> 
    );
};

export default Movies;