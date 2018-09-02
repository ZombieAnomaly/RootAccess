import React, { Component } from 'react';
import '../../Assets/css/FileExplorer.css';
import FileExplorer from './FileExplorer';

function FileExplorerBehavior(props){
        
    function handleClick(e){
        e.preventDefault();
        //console.log(e.target.value);
    }

    return(
        <FileExplorer className={"FileExplorer"}>
            <div className="SidePanel">
                <p>Places</p>
                <div className="FE_Place Active"><span>Desktop</span></div>
                <div className="FE_Place"><span>Documents</span></div>
                <div className="FE_Place"><span>Applications</span></div>
                <div className="FE_Place"><span>Modules</span></div>
                <p>Devices</p>
                <div className="FE_Device"><span>C:\</span> 
                    <div>
                        <div>5gb free</div
                        ><div>0gb used</div>
                    </div> 
                </div>
                <div className="FE_Device"><span>USB</span> 
                    <div>
                        <div>100mb free</div>
                        <div>0mb used</div>
                    </div>                 
                </div>
            </div>
            <div className="MainPanel Grid">
                <div className="FileDisplay GridItem"></div>
                <div className="FileDisplay GridItem"></div>
            </div>
        </FileExplorer>)

}
export default FileExplorerBehavior

