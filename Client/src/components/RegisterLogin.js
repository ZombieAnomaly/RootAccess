import React, { Component } from 'react';
import '../Assets/css/RegisterLogin.css'
import Asyncfunctions from '../Utilities/AsyncFunctions';
import InputBehavior from './form-components/InputBehavior';

class RegisterLogin extends Component{

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            errorMsg: "",
            Login:{
                Password:'Summer1996**',
                Email:'zombie',   
            },
            Register:{
                Username:'',
                Password:'',
                ConfirmPass:'',
                Email:'',   
            }
        }
        this.mounted = false;
        this.handleChange = this.handleChange.bind(this);
        this.RegisterHandler = this.RegisterHandler.bind(this);
        this.LoginHandler = this.LoginHandler.bind(this);
    }

    componentDidMount(){
        this.mounted = true;
    }
    componentWillUnmount(){
        this.mounted = false;
    }
    LoginHandler(e){
        e.preventDefault();
        Asyncfunctions.LoginAPICall(this.state.Login)
            .then(res => {
                let s = Object.assign({}, this.state);
                if(res['error'])
                    s.errorMsg = res['error'];
                else{
                    s.errorMsg = "";  
                    this.props.onSuccess(res)               
                }
                if(this.isMounted) this.setState(s);
            })
            .catch(err => console.log(err));
    }

    RegisterHandler(e){
        e.preventDefault();
        Asyncfunctions.RegisterAPICall(this.state.Register)
            .then(res => {
                let s = Object.assign({}, this.state);
                if(res['error'])
                    s.errorMsg = res['error'];
                else{
                    s.errorMsg = "";
                    this.props.onSuccess(res)                    
                }
                if(this.isMounted) this.setState(s);
            })
            .catch(err => console.log(err));
    }

    handleChange(event) {
        let s;
        switch(event.target.id){
            case "EmailR":s = Object.assign({},this.state); s.Register.Email = event.target.value; this.setState(s); break;
            case "UsernameR":s = Object.assign({},this.state); s.Register.Username = event.target.value; this.setState(s); break;
            case "PasswordR":s = Object.assign({},this.state); s.Register.Password = event.target.value; this.setState(s); break;
            case "C_PasswordR":s = Object.assign({},this.state); s.Register.ConfirmPass = event.target.value; this.setState(s);break;
            case "EmailL":s = Object.assign({},this.state); s.Login.Email = event.target.value; this.setState(s); break;
            case "PasswordL":s = Object.assign({},this.state); s.Login.Password = event.target.value; this.setState(s); break;
        }
      }

    render(){
        return(
            <div id = "NewUserNav">
                <form onSubmit={this.RegisterHandler}>
                    <h3 id = "message">{this.state.errorMsg}</h3>
                    <h1>[Register]</h1>
                    <InputBehavior value={this.state.Register.Email} onChange={this.handleChange} name='EmailR' type='email' label='Email address:'/>
                    <InputBehavior value={this.state.Register.Username} onChange={this.handleChange} name='UsernameR' type='text' label='Username:'/>
                    <InputBehavior value={this.state.Register.Password} onChange={this.handleChange} name='PasswordR' type='password' label='Password:'/>
                    <InputBehavior value={this.state.Register.ConfirmPass} onChange={this.handleChange} name='C_PasswordR' type='password' label='Confirm Pass:'/>
                    <input type="submit" name="RegisterB" id = "RegisterB" value = "[Register]" />
                </form>

                <form onSubmit={this.LoginHandler}>
                    <h1>[Sign In]</h1>
                    <InputBehavior value={this.state.Login.Email} onChange={this.handleChange} name='EmailL' type='text' label='Email address:'/>
                    <InputBehavior value={this.state.Login.Password} onChange={this.handleChange} name='PasswordL' type='password' label='Password:'/>
                    <input type="submit" name = "SignInB"id = "SignInB" value = "[Sign In]" />
                </form>
            </div>
        )
    }
}

export default RegisterLogin;