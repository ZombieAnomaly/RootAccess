import React, { Component } from 'react';

function Zombies(props){
    return(
        <span  id = "CMD_Zombies" className = "CMD_Content" >
            <table className="table table-striped ZTable">
                
                <thead>
                    <tr>
                        <th>IP Address:</th>
                        <th>Password:</th>
                        <th>Task(s):</th>
                        <th>Notes:</th>
                        <th>Action:</th>
                        <th>Money:</th>
                    </tr>
                </thead>

                <tbody >
                
                    <tr>
                        <td> {} </td>
                        <td> {} </td>
                        
                        <td>
                            <div className="dropdown">
                                <button className="dropbtn"><b>Assign Task</b></button>
                                <div className="dropdown-content">
                                    <button className = "ZDrop"><b>Assign Task</b></button>
                                    <button className = "ZDrop"><b>Email</b></button>
                                    <button className = "ZDrop"><b>Mine</b></button>
                                    <button className = "ZDrop"><b>Warez</b></button>
                                </div>
                            </div>
                        </td>
                       
                        <td>
                            <input type="text" name = "Task" value="Note here" className="ZombieTask" />
                        </td>
                        
                        <td>
                            <div className="dropdown">
                                <button className="dropbtn"><b>Action</b></button>
                                <div className="dropdown-content">
                                    <button className = "ZDrop"><b>Action</b></button>
                                    <button className = "ZDrop"><i className="fa fa-plug" aria-hidden="true"></i><b> connect</b></button>
                                    <button className = "ZDrop"><i className="fa fa-trash" aria-hidden="true"></i><b> delete</b></button>
                                </div>
                            </div>                     
                        </td>
                        
                        <td>
                            <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
                        </td>
                    </tr>

                </tbody>
            </table>
        </span>
    )
}

export default Zombies;