import { CircularProgress,Grid,Select,FormControl,Typography,InputLabel,MenuItem } from "@material-ui/core"; 
import { createRef, useEffect, useState } from "react";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from './styles'
const List = ({places,chiledClicked,isLoading,type,rating,setType,setRating}) => {
	const classes = useStyles();
	
	const [elRefs,setElRefs] = useState([])
	useEffect(() => {
		const refs = Array(places?.length).fill().map((_,i)=>elRefs[i] || createRef())
		setElRefs(refs);
	}, [places])
	return (
		<div className={classes.container}>
			<Typography variant="h4">Resturant , Hotels Around You</Typography>
			{
				isLoading?(
					<div className={classes.loading}>
						<CircularProgress size="5rem"/>
					</div>
				):(
					<>
					<FormControl className={classes.formControl}>
						<InputLabel>type</InputLabel>
						<Select value={type} onChange={(e)=>setType(e.target.value)}>
							<MenuItem value="restaurants">Restaurants</MenuItem>
							<MenuItem value="hotels">Hotels</MenuItem>
							<MenuItem value="attractions">Attractions</MenuItem>
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel>Rating</InputLabel>
						<Select value={rating} onChange={(e)=>setRating(e.target.value)}>
							<MenuItem value={0}>All</MenuItem>
							<MenuItem value={3}>Above 3.0</MenuItem>
							<MenuItem value={4}>Above 4.0</MenuItem>
							<MenuItem value={4.5}>Above 4.5</MenuItem>
						</Select>
					</FormControl>
					<Grid container spacing={3} className={classes.list}>
						{
							places.map((itm,i)=>(
								<Grid item key={i}  xs={12}>
									<PlaceDetails 
										place={itm}
										selected={Number(chiledClicked)===i}
										refProp={elRefs[i]}
									></PlaceDetails>
								</Grid>
							))
						}
					</Grid>
					</>
				)
			}
			
		</div>
	);
}
 
export default List;