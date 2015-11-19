import React from 'react';
import ReactDOM from 'react-dom';
// Assuming Mapbox/Leaflet is already exposed as `L`

export default class MapboxMap extends React.Component {
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
    
    var map = L.mapbox.map(ReactDOM.findDOMNode(this.refs.map), mapId, options);

    if (this.props.onMapCreated) {
      this.props.onMapCreated(map, L);
    }
  }

  render() {
    var mapStyle = {
      width: '100%',
      height: '100%'
    };

    return (
      <div ref='map' style={mapStyle}></div>
    );
  }
}