import React, { Component } from 'react';
import '../../Assets/css/IDE.css';
import {TextController} from 'react-text-highlights';

class IDE extends Component{

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            text: ""
        }
    }
        
    handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({text:e.target.value});
    }

    render(){
        return(
            <div className="CodeBox">
            <TextController regex={/\/#$\`~]/g} defaultText={""} tabbing={true} submitOnChange={true} hoverEffect={false} inputField={true} phrases={
                {
                    'blue': ['.', 'RootAccess'],
                    'red': [':: ', ':end ', '::end ', ': ']
                }
            } caret={{style:{position:'relative', right:'2px'},timer:400,character:"|"}} >
            </TextController>
            </div>
        )
    }
}
export default IDE

