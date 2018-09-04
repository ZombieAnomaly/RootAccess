import React, { Component } from 'react';
import  '../../Assets/css/PanelDraggable.css';
import DragHandle from './DragHandle';

function PanelDraggable(props){
    let className = "PanelDraggable", pos = props.Pos, 
    node, dragging, rel,size=props.size;

    function onMouseDown(e){
        if (e.button !== 0) return;
        if(!props.z) props.updateWindow("z");

        var nodeData = node.getBoundingClientRect();
        size = {width:nodeData.width,height:nodeData.height-7};
        dragging = true;
        rel = { x: e.pageX - nodeData.left, y: e.pageY - nodeData.top}
        props.updateWindow("pos",{x:nodeData.x,y:nodeData.y},size);
        e.stopPropagation(); e.preventDefault();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseUp(e){
        props.updateWindow("pos",pos,size);
        e.stopPropagation(); e.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e){
        if (!dragging) return;
        pos = { x: e.pageX - rel.x, y: e.pageY - rel.y};
        props.updateWindow("pos",pos,size);
        e.stopPropagation(); e.preventDefault();
    }

    function handleWindowClose(){ props.updateWindow("oc"); }
    function handleWindowMin(){ props.updateWindow("oc"); }

    return(
        <div ref={ el => node = el } className={className} style={{...{display:props.visible, zIndex:props.z, left:props.Pos.x || pos.x , top:props.Pos.y || pos.y,
            width:props.size.width+"px", height:props.size.height}}}>
            <DragHandle minWindow={handleWindowMin} closeWindow={handleWindowClose} windowName={props.windowName} onMouseDown={onMouseDown} className="dragHandle" />
            {props.children}
        </div>         
    )

}

export default PanelDraggable;