import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ParentContainer from './components/ParentContainer';
import CustomCanvas from './components/CustomCanvas';
import Asyncfunctions from './Utilities/AsyncFunctions';

class App extends Component {
  componentDidMount() {
      // Call our fetch function below once the component mounts
    Asyncfunctions.TestBackendAPI()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }


  render() {
      return (
        <div className="Cont">
          <ParentContainer/>
        </div>
      );
  }
}

export default App;
