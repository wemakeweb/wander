import React from 'react';
import ReactDOM from 'react-dom';
import downsize from 'downsize';
import { Link } from 'react-router';

export default class PostTile extends React.Component {
	render(){
		return (
			<article className="post show" ref="self">
				<div className="post-image">
					<img src={this.props.post.image} />
				</div>
				<h2 className="post-title">{this.props.post.title}</h2>
				<section className="post-content" dangerouslySetInnerHTML={{ __html: this.formatPostText()}}></section>
				<section className="post-meta">
					<Link to={this.props.post.url} query={{id:this.props.post.id}}>
						Read More
						<i className="fa fa-chevron-right"></i>
					</Link>
				</section>
    		</article>
    	);
	}

	formatPostText(){
		var excerpt = String(this.props.post.html);
		// Strip inline and bottom footnotes
		excerpt = excerpt.replace(/<a href="#fn.*?rel="footnote">.*?<\/a>/gi, '');
		excerpt = excerpt.replace(/<div class="footnotes"><ol>.*?<\/ol><\/div>/, '');
		// Strip other html
		excerpt = excerpt.replace(/<\/?[^>]+>/gi, '');
		excerpt = excerpt.replace(/(\r\n|\n|\r)+/gm, ' ');

		return downsize(excerpt, {words: 25 + Math.floor(20 * Math.random()) });
	}
}