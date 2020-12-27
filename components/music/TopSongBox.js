import {useEffect, useState} from 'react';
import jsonp from 'jsonp';
import Computation from "@utils/musicComputation";

const TopSongBox = ({song}) => {
    const [imageURL, setImageURL]= useState(false)

    useEffect(() => {
        const url = "https://itunes.apple.com/search?term=" + song.value.name + " " + song.value.artist + "&country=US&media=music&entity=musicTrack"
        jsonp(url, null, (err, data) => {
            if (err) {
                console.error(err.message);
            } else {
                if (data.results.length > 0) {
                    setImageURL(data.results[0].artworkUrl30.replace('30x30bb', '300x300bb'))
                }
            }
        });
    }, [])

    const topSong = song;
    let style = { maxWidth: "calc(6em + 4 * 300px)", backgroundRepeat: 'no-repeat', backgroundPositionX: '100%', backgroundSize: 'contain' }

    if (imageURL.length > 0) {
        const imageURLCSS = "url('"+imageURL+"')";
        style = { maxWidth: "calc(6em + 4 * 300px)", backgroundRepeat: 'no-repeat', backgroundPositionX: '100%', backgroundSize: 'contain', backgroundImage: imageURLCSS };
    }

    return (
        <div style={style}>
            <h3>Your most played song on Apple Music is</h3>
            <h1>{topSong.key}</h1>
            <p>
                You've played this <strong>{topSong.value.plays}</strong> 
                times for a total of 
                <strong>{Computation.convertTime(topSong.value.time)}</strong>
            </p>
        </div>
    );
}

export default TopSongBox;