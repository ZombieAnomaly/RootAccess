import React, { Component } from 'react';
import Panel from './panels/Panel';
import PanelDraggable from './panels/PanelDraggable';
import RegisterLogin from './RegisterLogin';
import InfobarBehavior from './InfobarBehavior';
import DockerIcon from './DockerIcon';
import IDE from './windows/IDE';
import FileExplorerBehavior from './windows/FileExplorerBehavior';
import * as icons from '../Assets/Images'
import  '../Assets/css/Desktop.css';

function Desktop(props){

    function handleSuccess(user){props.onSuccess(user);}
    function updateWindows(window){props.updateWindows(window);}
    function updateWindowsZ(window){props.updateWindowsZ(window);}
    function updateWindowsPos(window, pos, size){props.updateWindowsPos(window, pos, size);}

    const func = (window) => {updateWindows(window)}
    const funcZ = (window) => {updateWindowsZ(window)}
    const funcP = (window, pos, size) => {updateWindowsPos(window, pos, size);}

    const DesktopWindow = ({window, windowName, child}) => (
        <PanelDraggable z={props.windows[window].focus ? 1 : 0} updateWindowZ={() => {funcZ(window)}} updateWindowPos={(pos, size) => {funcP(window, pos, size)}} updateWindow={() => {func(window)}} className={"PanelDraggable"} windowName={windowName} size={ props.windows[window].size } Pos={props.windows[window].pos} draggable={true} resizable={true} visible={props.windows[window].open ? "block" : "none"}>
            {child}
        </PanelDraggable>           
    )

    if(props.loggedIn){
        return(
            <div className= "Desktop" style={{backgroundImage:"url("+props.bg+")"}}>
                <Panel name="Docker" draggable={false} resizable={false}>
                    <DockerIcon onClick={() => {func('system')}} iconSrc={icons.computerImg}/>
                    <DockerIcon  onClick={() => {func('fileExplorer')}} iconSrc={icons.folderImg}/>
                    <DockerIcon  onClick={() => {func('tor')}} iconSrc={icons.onionImg} />
                    <DockerIcon  onClick={() => {func('wallet')}} iconSrc={icons.walletImg}/>
                    <DockerIcon  onClick={() => {func('terminal')}} iconSrc={icons.terminalImg}/>
                    <DockerIcon  onClick={() => {func('ralEditor')}} iconSrc={icons.ideImg}/>
                    <DockerIcon  onClick={() => {func('zombies')}} iconSrc={icons.zedImg}/>
                </Panel>

                <Panel name="InfoBar" draggable={false} resizable={false}>
                    <InfobarBehavior state={props.state} ipStyle={{color:'#8BC34A'}} iconsContStyle={{color:'#8BC34A',marginRight:'1%',display:'flex'}} /> 
                </Panel>

                <DesktopWindow window="ralEditor" windowName="RAL IDE" child={<IDE/>}/>
                <DesktopWindow window="fileExplorer" windowName="File Explorer" child={<FileExplorerBehavior />}/>
                <DesktopWindow window="system" windowName="System" child={'System Window'}/>
                <DesktopWindow window="tor" windowName="TOR Browser" child={'TOR Browser'}/>
                <DesktopWindow window="wallet" windowName="Crypto Wallet" child={'Crypto Wallet'}/>
                <DesktopWindow window="terminal" windowName="Terminal" child={'Terminal! :D'}/>
                <DesktopWindow window="zombies" windowName="Zombies" child={'Zombies *brains*'}/>
            </div>         
        )
    }else{
        return(
            <div className= "Desktop" style={{backgroundImage:"url("+props.bg+")"}}>
                <Panel name="InfoBar" draggable={false} resizable={false}>
                    <InfobarBehavior state={props.state} ipStyle={{color:'#8BC34A'}} iconsContStyle={{color:'#8BC34A',marginRight:'1%',display:'flex'}} />   
                </Panel>

                <p className="MainHeader">[Root Access]</p>
                <RegisterLogin onSuccess={handleSuccess} state={props.state.clientState}/>
            </div> 
        )
    }
}

export default Desktop;