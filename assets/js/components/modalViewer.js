import React from 'react';
import DOM from '../lib/dom';
import Animated from '../lib/animation/animated';

export default class ModalViewer extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            animScale: new Animated.Value(0.95),
            animOpacity: new Animated.Value(0)
        };
    }

	onClose(){
        Animated.spring(this.state.animScale, { toValue: 0.95 }).start();
        Animated.spring(this.state.animOpacity, { toValue: 0 }).start();

        setTimeout(() => {
            this.props.onClose(React.findDOMNode(this));
        }, 600);
	}

	render(){
        let viewerStyle = {
            transform: [{scale: this.state.animScale}], 
            opacity: this.state.animOpacity,
            height: this.props.targetHeight,
            left: 0,
            width: '100%',
            height: '100%',
            top: 0,
            zIndex: 80,
            position: 'fixed',
            overflowX: 'auto',
            overflowY: 'scroll',
            background: '#fff'
        };

        let bar;

        if(this.props.title){
            bar = (
                <div className="bar" ref="bar" style={{width: this.props.targetWidth}}>
                    <div className="title">{this.props.title}</div>
                    <div className="right-item" onClick={this.onClose.bind(this)}><img className="close" src='/assets/img/close.svg' /></div>
                </div>
            );
        }
            
		return (
			 <Animated.div className="modal-viewer" style={viewerStyle}>
    			{bar}
    			<div ref="container" style={{height: this.props.targetHeight, position: 'absolute', overflowY: 'scroll'}}>
                    {this.props.children}
                </div>
            </Animated.div>
		);
	}

	componentDidMount(){
        Animated.spring(this.state.animScale, { toValue: 1 }).start();
        Animated.spring(this.state.animOpacity, { toValue: 1 }).start();
	}
}