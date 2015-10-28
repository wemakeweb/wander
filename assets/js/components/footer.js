import React from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends React.Component {
	render(){
		return (
			<div id="footer">
				<section className="colophon">
					<section className="copyright">
						&copy; <span itemProp="copyrightHolder">{this.props.blog.title}</span>|
						<a href="/imprint">Impressum</a>
					</section>	
				</section>
			</div>
		);
	}
}