import React, { Component } from 'react';

function Internet(props){
    return(
    <span id="CMD_Internet" className = "CMD_Content">
        <form>
            <div>
                <label htmlFor="IP_Address" id = "L_IP">Destination IP</label>
                <input type="text" name="IP_Address" id="IP_AddressI" />
            </div>
            <input type="button" id="ConnectB" value ="[Connect]" />
        </form>	
        <h3 id = "Internet_msg" className = "type-itCMDI"> {} </h3>
            <div >
                <h3 className = "Internet_text">Username: Admin</h3>
                <h3 className = "Internet_text" id = "Internet_pass">Password: {} </h3>
                <input type="button" id = "BreachB" value = "[Breach]" />
                <input type="button" id = "AccessB" value = "[Login]" />
                <h2 id = "progTime"> {} </h2>
            </div>    
    </span>         
    )
}

export default Internet;