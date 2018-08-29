import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import  './PanelDraggable.css';
import './DragHandle'
import DragHandle from './DragHandle';

class PanelDraggable extends Component{

    constructor(props){
        super(props);
        this.className = "PanelDraggable";
        
        this.style = {};
        for(var key in this.props.style){
            this.style[key] = this.props.style[key];
        }

        this.state =  this.getInitState();
        this.props = props;
        this.node;
        
    }

    getInitState() {
        return {
            visible: this.visible,
            pos: this.props.initialPos,
            dragging: false,
            rel: null, // position relative to the cursor
            style: this.style
        }
    }

    componentDidUpdate(props, state) {
        if (this.state.dragging && !state.dragging) {
          document.addEventListener('mousemove', this.onMouseMove)
          document.addEventListener('mouseup', this.onMouseUp)
        } else if (!this.state.dragging && state.dragging) {
          document.removeEventListener('mousemove', this.onMouseMove)
          document.removeEventListener('mouseup', this.onMouseUp)
        }
    }

    componentDidMount = () => {

        this.setState(this.style);
        this.node = ReactDOM.findDOMNode(this);
    }

    // calculate relative position to the mouse and set dragging=true
    onMouseDown = (e) => {
        // only left mouse button
        if (e.button !== 0) return
        var pos = this.node.getBoundingClientRect();
        var s = Object.assign({},this.state);
        s.dragging = true;
        s.rel = {
            x: e.pageX - pos.left,
            y: e.pageY - pos.top
        }
        this.setState(s);
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseUp = (e) => {
        var s = Object.assign({}, this.state);
        s.dragging = false;
        this.setState(s);
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseMove = (e) => {
        if (!this.state.dragging) return
        var s = Object.assign({}, this.state);
        s.pos ={
            x: e.pageX - this.state.rel.x,
            y: e.pageY - this.state.rel.y
        };
        var style = Object.assign({}, s.style);
        style.left = s.pos.x;
        style.top = s.pos.y;
        s.style = style;
        this.setState(s);
        e.stopPropagation()
        e.preventDefault()
    }

    handleWindowClose = () => {
        this.props.updateWindow();
    }

    handleWindowMin = () => {
        this.props.updateWindow();
    }

    render(){
        return(
            <div className={this.className} style={{...this.state.style, ...{display:this.props.visible}}}>
                <DragHandle minWindow={this.handleWindowMin} closeWindow={this.handleWindowClose} windowName={this.props.windowName} onMouseDown={this.onMouseDown} className="dragHandle" />
                {this.props.children}
            </div>         
        )
    }
}

export default PanelDraggable;