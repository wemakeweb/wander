import React from 'react';
import fetch from 'isomorphic-fetch';
import moment from 'moment-timezone';
import Mapbox from './map';

let accessToken = 'pk.eyJ1Ijoid2VtYWtld2ViIiwiYSI6ImY0RHptTkUifQ.PIWnfVPWyV8lrSy3VXDD4w';

export default class Currently extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
		this.loadContent();
	}	

	loadContent(){
		fetch('_api/locations')
		.then((response) => {
			if (response.status >= 400) {
            	throw new Error("Bad response from server");
       		}
        	return response.json();
		})
		.then((result) => {
			this.updateTime();
			this.setState({locations: result.locations});
		});
	}

	updateTime(){
		this.setState({
			now: moment()
		});

		setTimeout(this.updateTime.bind(this), 100);
	}

	render(){
		let current;
		let mapBoxUrl;

		if(this.state.locations){
			current = this.state.locations[this.state.locations.length-1];
			mapBoxUrl = `https://api.mapbox.com/v4/mapbox.streets/${current.cords[0]},${current.cords[1]}/100x100.png?access_token=${accessToken}`;
		}

		return (
			<div id="location">
				<div className="map">
					{current ? <img src={mapBoxUrl} /> : ''}
				</div>
				<div className="info">
					<div className="label">Currently</div>
					<div className="city">{current ? current.city : ''}, <span className="country">{current ? current.country : ''}</span></div>
					<div className="weather">15 °C · Mostly Cloudy</div> 
					<div className="time">{current ? this.state.now.tz(current.timezone).format('h:mm a') : ''}</div>
				</div>
			</div>
    	);
	}

}