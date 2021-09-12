import GoogleMapReact from 'google-map-react'
import { Paper,useMediaQuery,Typography } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles'
import { useState } from 'react';
const Map = ({setCoor,setBounds,coor,places,setChiledClicked}) => {
	const classes = useStyles();
	const isMobile = useMediaQuery('(min-width:600px'); 
	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{key:'AIzaSyBVMZVGdcBvQIv4N7wj35Y78yIKNjelAWg'}}
				defaultCenter={coor}
				center={coor}
				defaultZoom={14}
				margin={[50,50,50,50]}
				options={''}
				onChange={(e)=>{ 
					setCoor({lat:e.center.lat,lng:e.center.lng})
					setBounds({ne: e.marginBounds.ne,sw: e.marginBounds.sw})
				}}
				onChildClick={(child)=>setChiledClicked(child)}
			>
				{places?.map((itm,i)=>(
					<div className={classes.markerContainer}
					key={i}
					lat={Number(itm.latitude)}
					lng={Number(itm.longitude)}
				>
					{!isMobile?(<LocationOnOutlinedIcon color="primary"/>):
					(
						<Paper elevation={3} className={classes.paper}>
							<Typography className={classes.Typography} variant="subtitle2" gutterBottom>
							{itm.name}
							</Typography>
							<img className={classes.pointer} src={itm.photo?itm.photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}/>
							<Rating size='small' value={Number(itm.rating)} readOnly/>
						</Paper>
					)
					}
				</div>
				)
					
				)}
			</GoogleMapReact>
		</div>
	);
}
 
export default Map;