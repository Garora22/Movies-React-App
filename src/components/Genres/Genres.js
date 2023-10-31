import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({
    selectedGenres = [],
    setSelectedGenres,
    genres = [],
    setGenres, 
    type,
    setPage,
  }) => {
    const handleAdd = (genre)=>{
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g)=>g.id!==genre.id));
        setPage(1);
    };
    const handleRemove = (genre) =>
    {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres,genre]);
        setPage(1);
    };

    const fetchGenres = async () => {
        try {
            const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${'87e1657c60323127e94e31c497de5060'}&language=en-US`
            );
            setGenres(data.genres);
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch genres", error);
        }
    };
  
    useEffect(() => {
        fetchGenres();
        return () => {
            setGenres([]); 
        };
         // eslint-disable-next-line
    }, []);
  
    return (
        <div style={{ 
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            padding:"6px 0"
        }}>
            {selectedGenres && selectedGenres.map((genre)=>(
                <Chip 
                    label={genre.name} 
                    style={{margin: 2}} 
                    size="small" 
                    key={genre.id}
                    clickable 
                    onDelete={() => handleRemove(genre)}
                    sx={{ backgroundColor: '#666', color: '#fff' }} // Chip selected color
                />
            ))}
            {genres && genres.map((genre)=>(
                <Chip 
                    label={genre.name} 
                    style={{margin: 2}} 
                    size="small" 
                    key={genre.id}
                    clickable 
                    onClick={() => handleAdd(genre)}
                    sx={{ backgroundColor: '#fff', color: '#000' }} // Chip default color
                />
            ))}
        </div>
    );
};

export default Genres;
