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
                    system:{open:false, focus:false, pos:{x:'8%',y:'5%'}, size:{width:'300px',height:'300px'}, el:""},
                    fileExplorer:{open:false, focus:false, pos:{x:'8%',y:'5%'}, size:{width:'300px',height:'300px'}, el:""},
                    tor:{open:false, focus:false, pos:{x:'8%',y:'5%'}, size:{width:'300px',height:'300px'}, el:""},
                    wallet:{open:false, focus:false, pos:{x:'8%',y:'5%'}, size:{width:'300px',height:'300px'}, el:""},
                    terminal:{open:false, focus:false, pos:{x:'8%',y:'5%'}, size:{width:'300px',height:'300px'}, el:""},
                    ralEditor:{open:false, focus:false, pos:{x:'8%',y:'5%'}, size:{width:'300px',height:'300px'}, el:""},
                    zombies:{open:false, focus:false, pos:{x:'8%',y:'5%'}, size:{width:'300px',height:'300px'}, el:""},
                }
            },
            virtualPC:{},
            connection: "",
        };
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
        console.log(s);
        this.setState(s);
    }

    updateWindows = (window, action, pos=null, size=null) => {
        let s = Object.assign({}, this.state);
        let windows = Object.assign({}, s.clientState.windows);
        // console.log(action, window)
        switch(action){
            case "oc": windows[window].open = !windows[window].open; break;

            case "z":
                for(var w in windows)
                    w != window ? windows[w].focus = false : windows[w].focus = true;
            break;

            case "pos":
                for(var w in windows){
                    if(w == window)
                        windows[w] = { open:windows[w].open, focus:windows[w].focus, pos:pos, size:size }; }
            break;
        }
        s.clientState.windows = windows;
        this.setState(s);
    }

    render(){
        if(this.state.clientState.signedIn){
            return(
                <div className = "ParentContainer">
                    <Desktop updateWindowsPos={this.updateWindowsPos} updateWindowsZ={this.updateWindowsZ} updateWindows={this.updateWindows} windows={this.state.clientState.windows} loggedIn={this.state.clientState.signedIn} state={this.state} bg="http://www.omgubuntu.co.uk/wp-content/uploads/2015/03/suru-desktop-wallpaper-ubuntu-vivid.jpg"/>
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

