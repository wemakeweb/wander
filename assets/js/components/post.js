import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

export default class Post extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			post: window.reactProps.post
		};
	}

	render(){
		let headerStyle = {
			backgroundImage: 'url(' + this.state.post.image + ')' 
		};

		return (
			<div>
			<header id="header" className="animated fadeIn" style={headerStyle}>
    			<div className="header-background">
    			  	<section className="blog-content">
        				<Link id="site-url" className="blog-title" to="/">
        					<i className="fa fa-chevron-left"></i> Back
        				</Link>
        				<div className="pull-right blog-heart">432 <i className="fa fa-heart"></i></div>
    				</section>
    				<section className="header-content">
        				<h1 className="post-title animated fadeInUp">{this.state.post.title}</h1>
        				<span className="post-data">
                			<span className="date animated fadeInUp">
                    			<time className="timesince date" 
                    					data-timesince="{{date format='X'}}"
                    					dateTime="{{date format='YYYY-MM-DDTHH:mm'}}"
                    					title="{{date format='DD MMMM YYYY'}}">
                    				ago
                    			</time>
                     			{(this.state.post.tags || []).join(',')}
                     			by <span className="author">{this.state.post.author.name}</span>
                			</span>
            			</span>
    				</section>
    			</div>
			</header>
			<main id="main" className="content">
   				<article itemType="http://schema.org/BlogPosting"  className="animated fadeIn content post">
        			<section className="post-content" dangerouslySetInnerHTML={{ __html: this.state.post.html }} />
    			</article>
			</main>
		</div>);
	}
}