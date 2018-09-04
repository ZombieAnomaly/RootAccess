import React, { Component } from 'react';
import PanelDraggable from '../panels/PanelDraggable';

function DesktopWindow(props){
    let node;
    function updateWindows(action, pos, size){ props.parent.updateWindows(props.window, action, pos, size);}
    const func = (action, pos, size) => {updateWindows(action, pos, size)}
 
    return(
        <PanelDraggable z={props.parent.windows[props.window].focus ? 1 : 0} updateWindow={(action, pos=null, size=null) => {console.log(action,pos,size); func(action, pos, size)}} className={"PanelDraggable"} windowName={props.windowName} size={ props.parent.windows[props.window].size } Pos={props.parent.windows[props.window].pos} draggable={true} resizable={true} visible={props.parent.windows[props.window].open ? "block" : "none"}>
            {props.child}
        </PanelDraggable>
    )
}

export default DesktopWindow;