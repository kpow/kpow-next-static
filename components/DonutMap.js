import React from "react";
import { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, useMapEvent } from "react-leaflet";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Title from '@components/shared/Title';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider'

export default function DonutMap() {
  const [center, setCenter] = useState({latitude:"37.571249476602794", longitude:"-77.42448608398438"});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => { fetchDonuts(); }, [])

  const MapDrag = () => {
    const map = useMapEvent('moveend', () => {
      const LatLng = map.getCenter();
      setCenter({latitude:LatLng.lat, longitude:LatLng.lng});
      fetchDonuts();
    })
    return null
  }

  const MapEvents = () => {
    const map = useMapEvents({
      click: () => {
        map.locate()
      },
      locationfound: (location) => {
        console.log('location found:', location)
      },
    })
    return null
  }

  const fetchDonuts = () => {
    setLoading('loading...')
    const source = axios.CancelToken.source();
    axios.post('/.netlify/functions/donuts', {post:{latitude:center.latitude, longitude:center.longitude}, cancelToken: source.token})
    .then(res => {
        const fullData =  data ? [...data, ...res.data.data.businesses] : [...res.data.data.businesses]
        const cleanData = removeDuplicates(fullData, 'id')
        const noDunkin = cleanData.filter(isDunkin)
        setLoading(false);
        setError(null);
        setData(noDunkin);
    })
    .catch(err => {
        setLoading(false)
        setError('An error occurred. Awkward..')
    })
    return () => {
        source.cancel();
    }
  } 

  const isDunkin = (item) => item.name != 'Dunkin\'';

  const removeDuplicates = (arr, prop) => arr.reduce((acc, current) => {
    if(!acc.find(obj => obj[prop] === current[prop])){
      acc.push(current);
    }
    return acc;
  }, [])

  return (  
        <>
          <Divider style={{marginTop:'20px'}} />
          <Title>
            donuts {loading}
          </Title>
          <Divider style={{marginBottom:'20px',marginTop:'10px'}} />
          <MapContainer center={['37.571249476602794','-77.42448608398438']} zoom={12} scrollWheelZoom={false}>
              
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          
            {data &&
                data.map((article, index) => (                     
                  <Marker 
                    key={article.name+index} 
                    position={[article.coordinates.latitude, article.coordinates.longitude]}
                  >
                      <Popup>
                        <Link href={article.url} target="_blank">

                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image={article.image_url}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                              {article.name}
                              </Typography>
                              <Rating name="read-only" value={article.rating} readOnly />
                            </CardContent>
                          </CardActionArea>
                          {/* <CardActions>
                            <Button size="small" color="primary">
                              Share
                            </Button>
                            <Button size="small" color="primary">
                              Learn More
                            </Button>
                          </CardActions> */}

                        </Link>
                      </Popup>
                  </Marker>))
            }  
            <MapDrag />
            <MapEvents />
          </MapContainer>
          
          { error && <h1>{error}</h1> } 
         </>
        
  );
}