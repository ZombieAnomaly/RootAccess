import React, { Component } from 'react';
import '../../Assets/css/FileExplorer.css';

function FileExplorer(props){
        
    function handleClick(e){
        e.preventDefault();
        console.log(e.target.value);
    }

    return(
        <div className={props.className}>
            {props.children}
        </div>
    )

}
export default FileExplorer

