import {Autocomplete} from '@react-google-maps/api'
import {AppBar,Toolbar,Typography,InputBase,Box} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './styles' 
import { useState } from 'react'
const Header = ({setCoor}) => {
	const classes = useStyles()
	const [autocomplete, setAutocomplete] = useState(null)
	const onLoad = (autoC)=>{
		setAutocomplete(autoC)
	}
	const OnPlaceChanged = ()=>{
		const lat = autocomplete.getPlace().geometry.location.lat();
		const lng = autocomplete.getPlace().geometry.location.lng();
		setCoor({lat,lng})
	}
	
	return (
		<AppBar position='static'>
			<Toolbar className={classes.toolbar}>
				<Typography variant="h5" className={classes.title}>
					Travel Advisor
				</Typography>
				<Box display="flex">
					<Typography variant="h6" className={classes.title}>
						Explorer New Places
					</Typography>
					<Autocomplete onLoad={onLoad} onPlaceChanged={OnPlaceChanged}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon/>
							</div>
							<InputBase placeholder="seaerch..." classes={{root:classes.inputRoot,input:classes.inputInput}}/>
						</div>
					</Autocomplete>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
 
export default Header;