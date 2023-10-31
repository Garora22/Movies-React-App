import axios from "axios";
import { useEffect, useState } from "react";
import Singlecontent from "../../components/Singlecontent/singlecontent";
import './Trending.css';
import CustomPagination from "../../components/Pagiantion/CustomPagiantion";
const Trending = () => {
    const [page, setpage]=useState(1);
    const [content, setcontent]=useState([]);
    const fetchTren = async() =>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${'87e1657c60323127e94e31c497de5060'}&page=${page}`);

       console.log(data.results);

    setcontent(data.results);
};
useEffect(()=>{
    fetchTren();
    // eslint-disable-next-line
},[page]);
    return(
    <div>
        <span className="pagetitle">Trending</span>
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
                        media_type={c.media_type}
                        vote_average={c.vote_average}
                        rank={page === 1 ? index + 1 : null}
                    />
                ))  
            }
            
            
        </div> 
        <CustomPagination setpage={setpage} />
    </div> 
    );
};
export default Trending;
