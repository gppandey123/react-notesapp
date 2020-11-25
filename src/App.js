import React, { Component } from 'react';
import './App.css';

import Calander from './components/left/calander/Calander';


export default class App extends Component {

  state = {
    val : new Date()
  }
  change = (val) => {
          this.setState({val});
    }
  render() {
      const val =this.state.val;
      const date = val.getDate();
      const month = val.getMonth();
   
    return (
      <div>
        
        <Calander />
        
       
       
      </div>
    )
  }
}
