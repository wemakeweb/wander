import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import moment from 'moment';

export default class Post extends React.Component {
	constructor(props){
		super(props);
        
        this.state = {
            post: {
                title: '',
                tags: [],
                image: '',
                author: {
                    name: ''
                },
                html: ''
            }
        };

        this.loadPost();
	}

    loadPost(){
        fetch('/_api/posts/' + this.props.location.query.id)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then((result) => {
            this.setState({post: result.post})
        });
    }

	render(){
        // <div className="pull-right blog-heart">432 <i className="fa fa-heart"></i></div>

		return (
			<div className="post-template">
			<header id="header" className="animated fadeIn" style={{
                backgroundImage: 'url(' + this.state.post.image + ')' 
            }}>
    			<div className="header-background">
    			  	<section className="blog-content">
        				<Link id="site-url" className="blog-title" to="/">
        					<i className="fa fa-chevron-left"></i> Back
        				</Link>
    				</section>
    				<section className="header-content">
        				<h1 className="post-title animated fadeInUp">{this.state.post.title}</h1>
        				<span className="post-data">
                			<span className="date animated fadeInUp">
                    			<time className="timesince date" 
                    					data-timesince="{{date format='X'}}"
                    					dateTime="{{date format='YYYY-MM-DDTHH:mm'}}"
                    					title="{{date format='DD MMMM YYYY'}}">
                    			 {moment(this.state.post.created_at).fromNow()}
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