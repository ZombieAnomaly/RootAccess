import React, { Component } from 'react';
import  '../../Assets/css/Panel.css';

function Panel(props){
    let className = "Panel";
    let style = {};
    for(var key in props.style){
        style[key] = props.style[key];
    }
    return(
        <div className={className} style={style}>
            {props.children}
        </div>         
    )
}

export default Panel;