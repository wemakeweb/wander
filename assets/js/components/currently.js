import React from 'react';
import fetch from 'isomorphic-fetch';
import momentTZ from 'moment-timezone';
import moment from 'moment';
import Mapbox from './map';
import ModalViewer from './modalViewer';
import DOM from '../lib/dom';

let accessToken = 'pk.eyJ1Ijoic2ViYXN0aWFub3R0byIsImEiOiJjaWhha2Y5MmkwdWxodW1raTBsYzZrdGt4In0.20GmXaSYLdHlZwMmbdOcbw';

export default class Currently extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			width: DOM.getWindowWidth(),
			height: DOM.getWindowHeight(),
			detailExpanded: false
		};

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
			now: momentTZ()
		});

		setTimeout(this.updateTime.bind(this), 100);
	}

	placeMarker(map, L){
		return;

		let layer = L.mapbox.featureLayer().addTo(map);
		/*layer.on('layeradd', function(e) {
		  var marker = e.layer,
		      feature = marker.feature;
		  
			marker.setIcon(L.divIcon({
				"className": "icon", // class name to style
				"html": "&#9733;", // add content inside the marker
				"iconSize": null // size of icon, use null to set the size in CSS
			}));
		});*/
		
		let mapper = loc => loc.cords;
		let line = this.state.locations.map(mapper);
		L.polyline(line, {
			color: '#f75624',
			opacity: 0.4,
			weight: 3,
			lineJoin: 'round',
			lineCap: 'round'
		}).addTo(map);

		layer.setGeoJSON({
			type: 'FeatureCollection',
			features: this.state.locations.map((loc) => {
				return {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [loc.cords[1], loc.cords[0]]
					}
				}
			})
		});
	}

	toggleExpandBox(){
		this.setState({
			detailExpanded: !this.state.detailExpanded
		})
	}

	closeModal(){
		this.setState({
			detailView: false,
			detailExpanded: false
		});
	}

	render(){
		let current;
		let mapBoxUrl;
		let modal;
		let locations = this.state.locations;

		if(this.state.locations){
			current = locations[this.state.locations.length-1];
			mapBoxUrl = `https://api.mapbox.com/v4/mapbox.streets/${current.cords.join(',')},9/100x100.png?access_token=${accessToken}`;
		}

		if(this.state.detailView){
			let selectedLocation = locations[this.state.selectedIndex];
			let boxClassnames = 'map-overlay';

			if(this.state.detailExpanded){
				boxClassnames += ' expanded';
			}

			let localTime = momentTZ(this.state.now).tz(selectedLocation.timezone);

			let days;
			if(this.state.selectedIndex !== 0){
				let end;
				if(selectedLocation.departure){
					end = moment(selectedLocation.departure, "DD.MM.YYYY");
				} else {
					end = moment();
				}

				let start = moment(locations[this.state.selectedIndex - 1].departure, "DD.MM.YYYY");
				days = end.to(start, true);
			} else {
				days = '--';
			}

			modal = (
				<ModalViewer>
					<div className="map-close" onClick={this.closeModal.bind(this)}><img src="/assets/img/close.svg" /></div>
					<div className={boxClassnames}>
						<div className="map-head">
							<div className={this.state.selectedIndex < locations.length - 1 ? 'map-next' : 'map-next disabled'} onClick={() => {
								this.state.selectedIndex < locations.length - 1  && this.setState({selectedIndex: this.state.selectedIndex + 1})
							}}><img src="/assets/img/arrow_left.svg"/></div>
							<div className="map-selected" onClick={this.toggleExpandBox.bind(this)}>
								<div className="map-selected-city">{selectedLocation.city}, {selectedLocation.country}</div>
								<div className="map-selected-time">{selectedLocation.departure ? moment(selectedLocation.departure, "DD.MM.YYYY").fromNow() : 'Currently'}</div>
							</div>
							<div className={this.state.selectedIndex > 0 ? 'map-prev' : 'map-prev disabled'} onClick={() => {
								this.state.selectedIndex > 0 && this.setState({selectedIndex: this.state.selectedIndex - 1})
							}}><img src="/assets/img/arrow_right.svg"/></div>
						</div>
						<div className="expanded-box">
							<div className="float-4">
								<div className="item">{localTime.format('h')} <span className="blink">:</span> {localTime.format('mm a')}<div>Local Time</div></div>
								<div className="item">{selectedLocation.weather ? selectedLocation.weather.temp : '--' } °C<div>Temp</div></div>
								<div className="item">{days}<div>Time spent</div></div>
								<div className="item">0<div>Nomad Score</div></div>
							</div>
							<div>Articles</div>
							<div>Pictures</div>
						</div>
					</div>
					<Mapbox 
						accessToken={accessToken} 
						center={selectedLocation.cords}
						zoom={9} 
						style='mapbox://styles/sebastianotto/cihfy53cq00usbgm45y7q0g50'
						css={{ 
							width: this.state.width,
							height: this.state.height,
							backgroundColor: 'grey'
						}} 
						onMapCreated={this.placeMarker.bind(this)} />
				</ModalViewer>
			);
		}

		return (
			<div>
				{modal}
				<div id="location" onClick={() => {
					let index = this.state.locations.length - 1;

					this.setState({
						detailView: true,
						selected: this.state.locations[index],
						selectedIndex: index
					})
				}}>
					<div className="float-3">
						<div className="item">
							<div className="label">Km traveled</div>
							<div className="value">300</div>
						</div>
						<div className="item">
							<div className="label">Places visited</div>
							<div className="value">12</div>
						</div>
						<div className="item">
							<div className="label">Currently</div>
							<div className="value">{current ? current.city : ''}, {current ? current.country : ''}</div>
						</div>
					</div>
				</div>
			</div>
    	);
	}

}