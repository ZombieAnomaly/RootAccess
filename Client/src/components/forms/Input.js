import React, { Component } from 'react';

function Input(props){
    return(
        <div className = "InputCont">
            <label htmlFor={props.name}>{props.label}</label>
            <input value={props.value} onChange={props.onChange} type={props.type} name={props.name} className="Input" id={props.name} required/>
        </div>
    )
}

export default Input;