import React from 'react';
import ReactDOM from 'react-dom';
import downsize from 'downsize';
import { Link } from 'react-router';

export default class PostTile extends React.Component {
	render(){
		let postImage;

		if(this.props.post.image){
			postImage = <div className="post-image" style={{
					backgroundImage: 'url(' + this.props.post.image + ')'
				}}></div>;
		}

		return (
			<article className="post show" ref="self">
				{postImage}
				<h2 className="post-title">{this.props.post.title}</h2>
				<section className="post-content" dangerouslySetInnerHTML={{ __html: this.formatPostText()}}></section>
				<section className="post-meta ui-label">
					<Link to={this.props.post.url} query={{id:this.props.post.id}} className="ui-hover">
						Read More
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

		return downsize(excerpt, {words: 25 + Math.floor(20 * Math.random()) }) + '…';
	}
}