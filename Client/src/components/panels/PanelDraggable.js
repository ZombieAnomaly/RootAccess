import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import  '../../Assets/css/PanelDraggable.css';
import DragHandle from './DragHandle';

function PanelDraggable(props){
    let className = "PanelDraggable", pos = props.Pos, 
    node, dragging, rel;

    // calculate relative position to the mouse and set dragging=true
    function onMouseDown(e){
        if (e.button !== 0) return;
        if(!props.z) props.updateWindowZ();

        var pos = node.getBoundingClientRect();
        dragging = true;
        rel = { x: e.pageX - pos.left, y: e.pageY - pos.top}

        e.stopPropagation(); e.preventDefault();

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseUp(e){
        dragging = false;
        props.updateWindowPos(pos);
        e.stopPropagation(); e.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e){
        if (!dragging) return
        pos = { x: e.pageX - rel.x, y: e.pageY - rel.y};
        props.updateWindowPos(pos);
        e.stopPropagation(); e.preventDefault();
    }

    function handleWindowClose(){ props.updateWindow(); }
    function handleWindowMin(){ props.updateWindow(); }

    return(
        <div ref={ el => node = el } className={className} style={{...{display:props.visible, zIndex:props.z, left:props.Pos.x || pos.x , top:props.Pos.y || pos.y}}}>
            <DragHandle minWindow={handleWindowMin} closeWindow={handleWindowClose} windowName={props.windowName} onMouseDown={onMouseDown} className="dragHandle" />
            {props.children}
        </div>         
    )

}

export default PanelDraggable;