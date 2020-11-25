import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calander.css';
import Left from '../formInp/FormInp';

export default class Calander extends Component {
    state = {
        val : new Date()
      }
      change = (val) => {
              this.setState({val});
        }
    render() {
        let months = ["January", "February", "March", "April", "May",
                         "June", "July", "August", "September",
                          "October", "November", "December"];

        const val = this.state.val;
        const date = val.getDate();
        const month = months[val.getMonth()];
        const year = val.getFullYear();
        return (
            <div>
              <Calendar onChange={this.change} value={this.state.val} className="cal"/>
              <Left  date ={date} month = {month} year = {year}/>
            </div>
        )
    }
}
