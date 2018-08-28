import React, { Component } from 'react';
import Infobar from './Infobar';
import Clock from './Clock';

function InfobarBehavior(props){

        function handleSuccess(user){
            props.onSuccess(user);
        }

        return (
            <Infobar>
                <div style={props.ipStyle}>{props.state.virtualPC.ip}</div>
                <Clock/>
                <div style={props.iconContStyle}>
                    <span>Icons</span>
                </div>
            </Infobar>
        )
}

export default InfobarBehavior