import React, { Component } from 'react';
import Submit from './Submit';

class SubmitBehavior extends Component{

    constructor(props){
        super(props);
        this.props = props;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState({value: event.target.value});
      }
    
    render(){
        return(
            <Submit name={this.props.name} value={this.props.value}/>
        )
    }

}

export default InputBehavior;