import React from 'react';

export default class NomadLog extends React.Component {
	render(){
		return (
			<a style={{
			    position: 'absolute',
			    right: '15px',
			    top: '10px',
			    fontSize: 15,
			    fontFamily: "'proxima-nova', sans-serif",
			    fontWeight: 600,
			    color: '#D4D4D4'
			}} href="https://nomadlog.io">Nomadlog</a>
		);
	}
}