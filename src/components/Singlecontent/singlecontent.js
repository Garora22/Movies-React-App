import React, { useState } from 'react';
import { Badge, Dialog, DialogContent } from "@mui/material";
import axios from 'axios';
import { unavailable } from "./config/config";
import { img_300 } from "./config/config";
import Carousel from './Carousel/Carousel';
import './singlecontent.css';

const Singlecontent = ({ id, poster, title, date, overview, media_type, vote_average, rank }) => {
    const [open, setOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [tagline,setTagline]=useState('');
    const handleClickOpen = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${'87e1657c60323127e94e31c497de5060'}&language=en-US`
        );
    
        const response = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${'87e1657c60323127e94e31c497de5060'}&language=en-US`
        );
    
        const tagline = response.data.tagline;
        const youtubeVideoId = data.results[0]?.key;
        const embedUrl = youtubeVideoId ? `https://www.youtube.com/embed/${youtubeVideoId}` : null;
        
        setTrailerUrl(embedUrl);
        setTagline(tagline);
        setOpen(true);
    };
    

    const handleClose = () => {
        setOpen(false);
    };
    let year = date.substring(0, 4);
    return (
        <div className={`media ${rank && rank <= 3 ? "top-trending" : ""}`} onClick={handleClickOpen}>
            <Badge 
                badgeContent={vote_average} 
                color={vote_average > 7 ? "primary" : "secondary"} 
                sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    right: 0,
                }}
            />

            {rank && rank <= 3 && 
                <Badge 
                    className="badge-circle"
                    badgeContent={`${rank}`} 
                    sx={{ 
                        fontSize: '100',
                        color: '#fff', 
                        bgcolor: 'gold',
                        borderRadius: '50%', 
                        position: 'absolute', 
                        top: 0, 
                        left: 0,
                    }}
                />
            }

            <img src={poster ?  `${img_300}/${poster}` : unavailable} alt={title} />
            <b className="title">{title}</b>
            <div className="subtitle-container">
                <span className="subtitle">{media_type === "tv" ? "TV Series" : "Movie"}</span>
                <span className="subtitle">{date}</span>
            </div>

            <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
    maxWidth="lg" // Increase the max width
    fullWidth={true} // Make it full width
    sx={{
        '.MuiDialog-paper': {
            width: '50%', // Custom width
        }
    }}
>            <DialogContent className='dialog'>
                <div  className='box'>
                {trailerUrl && <iframe  title="Trailer" width="500" height="300" allowFullScreen src={trailerUrl}></iframe>}
                <div className='head'>
                <h1>{title}({year})</h1>
                "{tagline}"
                <p>{overview}</p>
                </div>
                </div>
                <Carousel id={id} media_type={media_type}/>
            </DialogContent>
        </Dialog>
        </div>
    );
}

export default Singlecontent;
