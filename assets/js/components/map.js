import React from 'react';
import ReactDOM from 'react-dom';
// Assuming Mapbox/Leaflet is already exposed as `L`

export default class MapboxMap extends React.Component {
  shouldUpdateCenter(next, prev) {
    if (!prev) { return true }
    return next[0] !== prev[0] || next[1] !== prev[1]
  }

  componentDidUpdate(prevProps) {
    const { center, zoom } = this.props
    if (center && this.shouldUpdateCenter(center, prevProps.center)) {
      this.map.flyTo({
        center: center
      });

      setTimeout(() => {
        this.props.didFlyTo && this.props.didFlyTo(this.map);
      }, 1200);
    }
    else if (zoom && zoom !== prevProps.zoom) {
      this.map.setZoom(zoom)
    }
  }

  componentDidMount(argument) {
    var props = this.props;

    var mapId = props.mapId || props.src || "mapbox.streets";

    var options = {};
    var ownProps = ['mapId', 'onMapCreated'];
    
    for (var k in props) {
      if (props.hasOwnProperty(k) && ownProps.indexOf(k) === -1) {
        options[k] = props[k];
      }
    }

    if(typeof mapboxgl === 'undefined'){
      return;
    }

    if(options.accessToken){
      mapboxgl.accessToken = options.accessToken;
    }

    options.container = ReactDOM.findDOMNode(this.refs.map);

    var map = new mapboxgl.Map(options);

    if (this.props.onMapCreated) {
      this.props.onMapCreated(map, mapboxgl);
    }

    this.map = map;
  }

  render() {
    return (
      <div ref='map' style={this.props.css}></div>
    );
  }
}