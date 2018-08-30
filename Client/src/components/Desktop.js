import React, { Component } from 'react';
import Panel from './panels/Panel';
import PanelDraggable from './panels/PanelDraggable';
import RegisterLogin from './RegisterLogin';
import InfobarBehavior from './InfobarBehavior';
import DockerIcon from './DockerIcon';
import IDE from './windows/IDE';

import * as icons from '../Assets/Images'
import  '../Assets/css/Desktop.css';
// import onionImg from '../Assets/Images/tor.png';
// import walletImg from '../Assets/Images/wallet.png';
// import computerImg from '../Assets/Images/computer.png';
// import folderImg from '../Assets/Images/folder.png';
// import terminalImg from '../Assets/Images/terminal.png';
// import ideImg from '../Assets/Images/IDE.png';
// import zedImg from '../Assets/Images/zombie.png';

function Desktop(props){
    // console.log(props);

    function handleSuccess(user){props.onSuccess(user);}
    function updateWindows(window){props.updateWindows(window);}
    function updateWindowsZ(window){props.updateWindowsZ(window);}
    function updateWindowsPos(window, pos){props.updateWindowsPos(window, pos);}

    const func = (window) => {updateWindows(window)}
    const funcZ = (window) => {updateWindowsZ(window)}
    const funcP = (window, pos) => {updateWindowsPos(window, pos);}
   

    if(props.loggedIn){
        const windows = props.windows;
        const DesktopWindow = ({window, windowName, child}) => (
            <PanelDraggable z={windows[window].focus ? 1 : 0} updateWindowZ={() => {funcZ(window)}} updateWindowPos={(pos) => {funcP(window, pos)}} updateWindow={() => {func(window)}} className={"PanelDraggable"} windowName={windowName} Pos={windows[window].pos} draggable={true} resizable={true} visible={windows[window].open ? "block" : "none"}>
                {child}
            </PanelDraggable>           
        )

        return(
            <div className= "Desktop" style={{backgroundImage:"url("+props.bg+")"}}>

                <Panel name="Docker" style={{ backgroundColor: "rgba(46, 46, 46, 0.8)", height: "100%",boxShadow:'1px 0px 5px black', width:"7%",maxWidth:'80px',paddingTop:"0%", flexDirection:'column',
                minWidth:'64px', overflowY:'scroll', justifyContent:'center'}} draggable={false} resizable={false}>
                    <DockerIcon onClick={() => {func('system')}} iconSrc={icons.computerImg}/>
                    <DockerIcon  onClick={() => {func('fileExplorer')}} iconSrc={icons.folderImg}/>
                    <DockerIcon  onClick={() => {func('tor')}} iconSrc={icons.onionImg} />
                    <DockerIcon  onClick={() => {func('wallet')}} iconSrc={icons.walletImg}/>
                    <DockerIcon  onClick={() => {func('terminal')}} iconSrc={icons.terminalImg}/>
                    <DockerIcon  onClick={() => {func('ralEditor')}} iconSrc={icons.ideImg}/>
                    <DockerIcon  onClick={() => {func('zombies')}} iconSrc={icons.zedImg}/>
                </Panel>

                <Panel name="InfoBar" style={{ backgroundColor: "rgba(34, 34, 34, 1)",height: "4%", width:"100%", boxShadow:'0px 1px 10px black', minHeight:'20px',maxHeight:'32px',alignItems:"center"
                }} draggable={false} resizable={false}>
                    <InfobarBehavior state={props.state} ipStyle={{color:'#8BC34A'}} iconsContStyle={{color:'#8BC34A',marginRight:'1%',display:'flex'}} /> 
                </Panel>

                <DesktopWindow window="ralEditor" windowName="RootAccess IDE" child={<IDE/>}/>
                <DesktopWindow window="fileExplorer" windowName="File Explorer" child={'File Explorer'}/>
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

                <Panel name="InfoBar" style={{ backgroundColor: "rgba(34, 34, 34, 1)", height: "4%",boxShadow:'0px 1px 5px 1px black', width:"100%", minHeight:'20px',maxHeight:'32px', alignItems:"center"
                }} draggable={false} resizable={false}>
                    <InfobarBehavior state={props.state} ipStyle={{color:'#8BC34A'}} iconsContStyle={{color:'#8BC34A',marginRight:'1%',display:'flex'}} />   
                </Panel>

                <p className="MainHeader">[Root Access]</p>
                <RegisterLogin onSuccess={handleSuccess} state={props.state.clientState}/>

            </div> 
        )
    }
}

export default Desktop;