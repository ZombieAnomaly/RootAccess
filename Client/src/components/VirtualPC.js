import React, { Component } from 'react';
import Internet from './Internet';
import MyComputer from './MyComputer';
import Desktop from './Desktop';
import  './VirtualPC.css';

function VirtualPC(props){

        function handleSuccess(user){
            props.onSuccess(user);
        }
        return <Desktop onSuccess={handleSuccess} loggedIn={props.state.clientState.signedIn} state={props.state} bg="http://www.omgubuntu.co.uk/wp-content/uploads/2015/03/suru-desktop-wallpaper-ubuntu-vivid.jpg"/>
}

export default VirtualPC