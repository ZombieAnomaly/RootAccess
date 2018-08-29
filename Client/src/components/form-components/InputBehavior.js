import React, { Component } from 'react';
import Input from './Input';

 function InputBehavior(props){
    return(
        <Input value={props.value} onChange={props.onChange} name={props.name} type={props.type} label={props.label}/>
    )
}

export default InputBehavior;