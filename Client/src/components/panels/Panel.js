import React, { Component } from 'react';
import  '../../Assets/css/Panel.css';

function Panel(props){
    let className = "Panel", style = {};
    for(var key in props.style){
        style[key] = props.style[key];
    }

    return(
        <div className={className +" "+ props.name} style={style}>
            {props.children}
        </div>         
    )
}

export default Panel;