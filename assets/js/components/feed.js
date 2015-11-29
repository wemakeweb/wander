import React from 'react';
import ReactDOM from 'react-dom';
import {} from 'array.from';
import MasonryFactory from 'react-masonry-component';
let MasonryComponent = MasonryFactory(React);
import fetch from 'isomorphic-fetch';

import Footer from './footer';
import PostTile from './postTile';
import Header from './header';
import Currently from './currently';
import NomadLog from './nomadLog';

export default class Feed extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			posts: [],
			blog: {}
		};

		this.loadContent();
		this.loadBlog();
	}

	loadContent(){
		fetch('_api/posts')
		.then((response) => {
			if (response.status >= 400) {
            	throw new Error("Bad response from server");
       		}
        	return response.json();
		})
		.then((result) => {
			this.setState({posts: result.posts})
		});
	}

	loadBlog(){
		fetch('_api/blog')
		.then((response) => {
			if (response.status >= 400) {
            	throw new Error("Bad response from server");
       		}
        	return response.json();
		})
		.then((result) => {
			this.setState({blog: result.blog})
		});
	}

	render(){
		let posts = [];

		this.state.posts.forEach((post) => {
			posts.push(<PostTile post={post} />);
		});

		return (
			<div>
				<NomadLog />
				<div className="home-template">
					<Header blog={this.state.blog} />
					<Currently />
					<main id="main" className="archive">
						<section id="feed">
							<h2 className="divider ui-label"><span>Stories</span></h2>
							<MasonryComponent 
								options={{
									columnWidth: '.post:not(.featured)',
	                				itemSelector: '.post',
	                				gutter: 20
								}}
								className="feed" 
								ref="posts">
								{posts}
							</MasonryComponent>
						</section>
					</main>
					<Footer blog={this.state.blog} />
				</div>
			</div>
		);
	}
}