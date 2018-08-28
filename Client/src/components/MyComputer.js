import React, { Component } from 'react';

function MyComputer(props){
    return(
    <span id= "CMD_MyComputer" className="CMD_Content">
        <h1 className = "MyPCHeader">My Computer</h1>
        
        <h3 className="MyPCHeaders">My Information</h3>
            <p className = "MyPC">Virtual IP : </p><div className = "MyPCInfoText" id = "V_IP"> {} </div>
            <p className = "MyPC">Virtual Password : </p><div className = "MyPCInfoText" id = "V_Pass"> {} </div>
            <p className = "MyPC">Reset Total : </p><div className = "MyPCInfoText" id = "V_Resets"> {} </div>
            <p className = "MyPC">Reputation : </p><div className = "MyPCInfoText" id = "V_EXP"> {} </div>
            <p className = "MyPC">Rank : </p><div className = "MyPCInfoText" id = "V_Rank"> {} </div>
            <p className = "MyPC">Alt Coins: </p><div className = "MyPCInfoText" id = "V_AltCoins"> {} </div>
        
        <h3 className="MyPCHeaders">My Software</h3>
            <p className = "MyPC" id = "Soft_FW">Firewall: </p><div className = "MyPCInfoText" id = "NSoft_FW"> {} </div>
            <p className = "MyPC" id = "Soft_WW">Waterwall: </p><div className = "MyPCInfoText" id = "NSoft_WW"> {} </div>
            <p className = "MyPC" id = "Soft_BF">Bruteforcer: </p><div className = "MyPCInfoText" id = "NSoft_BF"> {} </div>
            <p className = "MyPC" id = "Soft_VPN">VPN: </p><div className = "MyPCInfoText" id = "NSoft_VPN"> {} </div>
        
        <h3 className="MyPCHeaders">My Hardware</h3>
            <p className = "MyPC" >Processor: </p><div className = "MyPCInfoText" id = "NHW_CPU"> {} </div>
            <p className = "MyPC" >HardDrive: </p><div className = "MyPCInfoText" id = "NHW_HD"> {} </div>
            <p className = "MyPC" >Connections: </p><div className = "MyPCInfoText" id = "NHW_Conn"> {} </div>
            <p className = "MyPC" >External Drive: </p><div className = "MyPCInfoText" id = "NHW_ED_"> {} </div>	
            <p className = "MyPC" >Coolant System: </p><div className = "MyPCInfoText" id = "NHW_Cool"> {} </div>		
    </span>         
    )
}

export default MyComputer;