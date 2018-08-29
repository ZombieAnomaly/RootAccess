import React, { Component } from 'react';
import Desktop from './Desktop';
// import RootAccessVM from '../RAL-Core/RootAccessVM';
import Asyncfunctions from '../Utilities/AsyncFunctions';

class ParentContainer extends Component{

    constructor(props){
        super(props);
        this.state = {
            userInfo:{
                username:"",
                email:"",
                id:"",
            },
            clientState:{
                signedIn:false,
                windows: {
                    system:{open:false, focus:false},
                    fileExplorer:{open:false, focus:false},
                    tor:{open:false, focus:false},
                    wallet:{open:false, focus:false},
                    terminal:{open:false, focus:false},
                    ralEditor:{open:false, focus:false},
                    zombies:{open:false, focus:false},
                }
            },
            virtualPC:{},
            connection: "",
        }

    this.checkSession();
    }

    checkSession = () => {
        Asyncfunctions.CheckSessionAPI()
            .then(res => {
                if(!res.session){return};
                let s = Object.assign({},this.state);
                s.clientState.signedIn = true;
                s.userInfo.email = res.data.email;
                s.userInfo.username = res.data.username;
                s.virtualPC = res.virtualPC;
                this.setState(s);
            })
            .catch(err => console.log(err));
    }

    compile(text){
        this.VM.Compile(this.text);
    }

    handleSuccess = (user) => {
        if(user.data[0]){user.data = user.data[0]}
        let s = Object.assign({}, this.state);
        s.clientState.signedIn = true;
        s.userInfo.email = user.data.email;
        s.userInfo.username = user.data.username;
        s.virtualPC = user.virtualPC;
        this.setState(s);
    }

    updateWindows = (window) => {
        let s = Object.assign({}, this.state);
        let windows = Object.assign({}, s.clientState.windows);
        windows[window].open = !windows[window].open;
        s.clientState.windows = windows;
        this.setState(s);
    }

    updateWindowsZ = (window) => {
        let s = Object.assign({}, this.state);
        let windows = Object.assign({}, s.clientState.windows);

        for(var w in windows){
            console.log(w,window);
            if(w != window)
                windows[w].focus = false;
            else
                windows[w].focus = true;
        }
        console.log( s.clientState.windows = windows);
        s.clientState.windows = windows;
        this.setState(s);
    }

    render(){
        if(this.state.clientState.signedIn){
            return(
                <div className = "ParentContainer">
                    <Desktop updateWindowsZ={this.updateWindowsZ} updateWindows={this.updateWindows} windows={this.state.clientState.windows} loggedIn={this.state.clientState.signedIn} state={this.state} bg="http://www.omgubuntu.co.uk/wp-content/uploads/2015/03/suru-desktop-wallpaper-ubuntu-vivid.jpg"/>
                </div>
                
            );
        }else{
            return(
                <div className = "ParentContainer">
                    <Desktop onSuccess={this.handleSuccess} loggedIn={this.state.clientState.signedIn} state={this.state} bg="http://www.omgubuntu.co.uk/wp-content/uploads/2015/03/suru-desktop-wallpaper-ubuntu-vivid.jpg"/>
                </div>
                
            );
        }
    }
    
}

export default ParentContainer;

