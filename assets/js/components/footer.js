import React from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends React.Component {
	render(){
		return (
			<div id="footer">
				<section className="colophon">
					<a href="/imprint">Imprint</a> / <a href="#">Terms</a>
				</section>
			</div>
		);
	}
}