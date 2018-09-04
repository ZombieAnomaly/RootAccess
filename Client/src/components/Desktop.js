import React, { Component } from 'react';
import Panel from './panels/Panel';
import DesktopWindow from './windows/DesktopWindow';
import RegisterLogin from './RegisterLogin';
import InfobarBehavior from './InfobarBehavior';
import DockerIcon from './DockerIcon';
import IDE from './windows/IDE';
import FileExplorerBehavior from './windows/FileExplorerBehavior';
import * as icons from '../Assets/Images'
import  '../Assets/css/Desktop.css';

function Desktop(props){
    
    function handleSuccess(user){props.onSuccess(user);}
    function updateWindows(window, action, pos, size){ 
        if(props.windows[window].el && !props.windows[window].open) {props.windows[window].el.init()}; 
            props.updateWindows(window, action, pos, size);
    }
    const func = (window, action, pos, size) => {updateWindows(window, action, pos, size)}

    if(props.loggedIn){
        return(
            <div className= "Desktop" style={{backgroundImage:"url("+props.bg+")"}}>
                <Panel name="Docker" draggable={false} resizable={false}>
                    <DockerIcon onClick={() => {func('system', 'oc')}} iconSrc={icons.computerImg}/>
                    <DockerIcon  onClick={() => {func('fileExplorer', 'oc')}} iconSrc={icons.folderImg}/>
                    <DockerIcon  onClick={() => {func('tor','oc')}} iconSrc={icons.onionImg} />
                    <DockerIcon  onClick={() => {func('wallet','oc')}} iconSrc={icons.walletImg}/>
                    <DockerIcon  onClick={() => {func('terminal','oc')}} iconSrc={icons.terminalImg}/>
                    <DockerIcon  onClick={() => {func('ralEditor','oc')}} iconSrc={icons.ideImg}/>
                    <DockerIcon  onClick={() => {func('zombies','oc')}} iconSrc={icons.zedImg}/>
                </Panel>

                <Panel name="InfoBar" draggable={false} resizable={false}>
                    <InfobarBehavior state={props.state} ipStyle={{color:'#8BC34A'}} iconsContStyle={{color:'#8BC34A',marginRight:'1%',display:'flex'}} /> 
                </Panel>

                <DesktopWindow window="ralEditor" parent={props} windowName="RAL IDE" 
                    child={<IDE  ref={ el => props.windows['ralEditor'].el = el } state={props.state}/>}/>

                <DesktopWindow window="fileExplorer" parent={props} windowName="File Explorer" 
                    child={ <FileExplorerBehavior ref={ el => props.windows['fileExplorer'].el = el } state={props.state}/> }/>

                <DesktopWindow window="system" parent={props} windowName="System" child={'System Window'}/>
                <DesktopWindow window="tor" parent={props} windowName="TOR Browser" child={'TOR Browser'}/>
                <DesktopWindow window="wallet" parent={props} windowName="Crypto Wallet" child={'Crypto Wallet'}/>
                <DesktopWindow window="terminal" parent={props} windowName="Terminal" child={'Terminal! :D'}/>
                <DesktopWindow window="zombies" parent={props}  windowName="Zombies" child={'Zombies *brains*'}/>
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