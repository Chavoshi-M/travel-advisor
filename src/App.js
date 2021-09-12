 import './App.css';
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

import {CssBaseline,Grid} from '@material-ui/core'
import { Fragment, useEffect, useState } from 'react';
import { getPlacesData } from './api';

const App = () => {
  const [places, setplaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [coor, setCoor] = useState({lat:0.01386165605373435,lng:0.02158641815185547})
  const [bounds, setBounds] = useState({sw:{lat: 0.01386165605373435, lng: 0.02158641815185547},ne:{lat: 40.41384560395184, lng: -3.7071722286251543}})
	const [chiledClicked, setChiledClicked] = useState(null)
	const [loading, setLoading] = useState(false)
  const [type, setType] = useState('restaurants');
	const [rating, setRating] = useState(0); 


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>setCoor({lat:latitude,lng:longitude}))
  }, [])
  useEffect(() => {
    const filteredPlacces =  places.filter(place=>place.rating > rating);
    setFilteredPlaces(filteredPlacces)
  }, [rating])
  useEffect(() => {  
    if(bounds.sw){
      setLoading(true); 
      getPlacesData(type,bounds.sw,bounds.ne).then((data)=>{
        setLoading(false); 
        setplaces(data?.filter(place=>place.name && place.num_reviews > 0)); 
      })  
    }
  }, [type,bounds]) 
  return (
    <Fragment>
      <CssBaseline/>
      <Header setCoor={setCoor}/>
      <Grid container spacing={3} style={{width:'100%'}}>
        <Grid item xs={4} md={4}>
          <List 
            places={filteredPlaces.length ? filteredPlaces : places} 
            chiledClicked={chiledClicked}
            type={type}
            rating={rating}
            setType={setType}
            setRating={setRating}
            />
        </Grid>
        <Grid item xs={8} md={8}>
          <Map 
            setCoor={setCoor} 
            setBounds={setBounds} 
            coor={coor} 
            isLoading={loading}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChiledClicked={setChiledClicked}
            />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default App;
