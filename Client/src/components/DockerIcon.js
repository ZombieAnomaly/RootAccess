import React, { Component } from 'react';
import '../Assets/css/DockerIcon.css'
function DockerIcon(props){
    return(<div onClick={props.onClick} className="DockerIcon" style={props.iconStyle}>
                <img src={props.iconSrc} style={{width:'100%',height:'100%'}}/>
            </div>)
}
export default DockerIcon