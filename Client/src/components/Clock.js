import React, { Component } from 'react';

class Clock extends Component{
    constructor(props){
        super(props)
        this.props = props;
        let hours = new Date().getHours(),
        mins = new Date().getMinutes(),
        secs = new Date().getSeconds();
        let ampm = "am";
        if(hours < 10){hours = "0"+hours};
        if(hours > 12){hours -=12; ampm = "pm"}else{ampm = "am"};
        if(mins < 10){mins = "0"+mins};
        if(secs < 10){secs = "0"+secs};
        this.state = { time: hours+":"+ mins +":"+ secs + " "+ampm};
        
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let hours = new Date().getHours(),
                mins = new Date().getMinutes(),
                secs = new Date().getSeconds();
            let ampm = "am";
            if(hours < 10){hours = "0"+hours};
            if(hours > 12){hours -=12; ampm = "pm"}else{ampm = "am"};
            if(mins < 10){mins = "0"+mins};
            if(secs < 10){secs = "0"+secs};
            this.setState({ time: hours+":"+ mins +":"+ secs + " "+ampm })
        }, 1000);
      }

    componentWillUnmount(){
        clearInterval(this.interval);
    }
    render(){
        return( <div className="Clock" style={{color:'#8BC34A'}}>{this.state.time}</div>)
    }
}

export default Clock;