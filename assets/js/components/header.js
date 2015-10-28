import React from 'react';

export default class Header extends React.Component {
	render(){
		return (
			<header id="header">
				<div className="header-background">
					<section className="blog-content animated fadeIn">
						<a id="site-url" className="blog-title" href="{this.props.blog.url}">{this.props.blog.title}</a>
						<span className="blog-description">{this.props.blog.description}</span>
					</section>
				</div>
			</header>
		)
	}
}