import React, { Component } from 'react';

function Submit(props){
    return(
        <input type="submit" name={props.name} id={props.name} value={props.value} />
    )
}

export default Submit;