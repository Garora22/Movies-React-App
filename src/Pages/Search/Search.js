import { ThemeProvider } from "@emotion/react";
import { SearchSharp } from "@mui/icons-material"; // Correct import name
import { Button, TextField, createMuiTheme, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import './Search.css'
import axios from "axios";
import Singlecontent from "../../components/Singlecontent/singlecontent";
import CustomPagination from "../../components/Pagiantion/CustomPagiantion";

const Search = () => {
    
    const[type,setType]=useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
  

    const darkTheme = createMuiTheme({
        palette:{
            type:"black",
            primary: {
                main: "#000",
            },
        },
    });

    const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
                '87e1657c60323127e94e31c497de5060'
            }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
          );
          setContent(data.results);
          setNumOfPages(data.total_pages);
          // console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
      useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
      }, [type, page,searchText]);

    return(
    <div>
        <ThemeProvider theme={darkTheme}>
            <div style={{display:"flex", margin:"15px 0"}}>
                <TextField
                    textColor="white"
                    style={{flex:1} }
                    className="SearhBox inputColor"
                    label="Search"
                    variant="filled"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="contained" style={{marginLeft: 10}} onClick={fetchSearch}>
                    <SearchSharp/> 
                </Button>
            </div>
            <div style={{display: "flex",flexWrap:"nowrap", justifyContent: "center", paddingBottom: 5}}>
    <Tabs
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
            setType(newValue);
            setPage(1); 
        }}
        aria-label="disabled tabs example"
    >
        <Tab style={{ width: "50%" }} label="Search Movies" />
        <Tab style={{ width: "50%" }} label="Search TV Series" />
    </Tabs>
</div>

        </ThemeProvider>
        <div className="trending">
    {content.length > 0 ? (
        content.map((c) => (
            <Singlecontent
                overview={c.overview}
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
            />
        ))
    ) : (
        searchText && <h2>{type ? "No Series Found" : "No Movies Found"}</h2>
    )}
</div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div> 
    );
};

export default Search;
