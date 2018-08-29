import React, { Component } from 'react';

function DragHandle(props){

        function handleSuccess(user){
            props.onSuccess(user);
        }

        return (
            <div onMouseDown={props.onMouseDown} className="dragHandle"> 
                <div className="WindowControl">
                    <div onClick={props.closeWindow} className="WindowCtrlButton"><span>x</span></div>
                    <div onClick={props.minWindow} className="WindowCtrlButton"><span>--</span></div>
                    <div className="WindowCtrlButton">+</div> 
                </div>
                <p title={props.windowName} className="WindowName depth"> {props.windowName} </p>
            </div>
        )
}

export default DragHandle