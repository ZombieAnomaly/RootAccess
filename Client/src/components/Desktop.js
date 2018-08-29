import React, { Component } from 'react';
import Panel from './Panel';
import PanelDraggable from './PanelDraggable';
import RegisterLogin from './RegisterLogin';
import InfobarBehavior from './InfobarBehavior';
import DockerIcon from './DockerIcon';
import IDE from './IDE';

import  './Desktop.css';
import onionImg from '../Assets/Images/tor.png';
import walletImg from '../Assets/Images/wallet.png';
import computerImg from '../Assets/Images/computer.png';
import folderImg from '../Assets/Images/folder.png';
import terminalImg from '../Assets/Images/terminal.png';
import ideImg from '../Assets/Images/IDE.png';
import zedImg from '../Assets/Images/zombie.png';

function Desktop(props){
    console.log(props);

    function handleSuccess(user){
        console.log(user);
        props.onSuccess(user);
    }

    if(props.loggedIn){
        return(
            <div className= "Desktop" style={{backgroundImage:"url("+props.bg+")"}}>

                <Panel name="Docker" style={{ backgroundColor: "rgba(46, 46, 46, 0.8)", height: "100%",boxShadow:'1px 0px 5px black', width:"7%",maxWidth:'80px',paddingTop:"0%", flexDirection:'column',
                minWidth:'64px', overflowY:'scroll', justifyContent:'center'}} draggable={false} resizable={false}>
                    <DockerIcon iconSrc={computerImg}/>
                    <DockerIcon iconSrc={folderImg}/>
                    <DockerIcon iconSrc={onionImg} />
                    <DockerIcon iconSrc={walletImg}/>
                    <DockerIcon iconSrc={terminalImg}/>
                    <DockerIcon iconSrc={ideImg}/>
                    <DockerIcon iconSrc={zedImg}/>
                </Panel>

                <Panel name="InfoBar" style={{ backgroundColor: "rgba(34, 34, 34, 1)",height: "4%", width:"100%", boxShadow:'0px 1px 10px black', minHeight:'20px',maxHeight:'32px',alignItems:"center"
                }} draggable={false} resizable={false}>
                    <InfobarBehavior state={props.state} ipStyle={{color:'#8BC34A'}} iconsContStyle={{color:'#8BC34A',marginRight:'1%',display:'flex'}} /> 
                </Panel>

                <PanelDraggable className={"PanelDraggable"} windowName={"RootAccess IDE"} name="RAL-IDE" initialPos={{x:0,y:0}} draggable={true} resizable={true}>
                    <IDE/>
                </PanelDraggable>

                
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