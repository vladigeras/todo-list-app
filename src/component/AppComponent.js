import React, {Component} from 'react';
import '../App.css';
import moment from 'moment';
import {TaskListComponent} from "./TaskListComponent";

class AppComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: moment()
        };
    }

    prevDate = () => {
        this.setState({date: this.state.date.subtract(1, 'day')});
    };

    nextDate = () => {
        this.setState({date: this.state.date.add(1, 'day')});
    };

    render() {
        const {date} = this.state;

        return (
            <div>
                <header>
                    <h1>To do list</h1>
                    <div>
                        <button className="date-buttons" onClick={this.prevDate}><span className="fa fa-arrow-left"/></button>
                        <span className="date-value">Date: {date.format("DD.MM.YYYY")}</span>
                        <button className="date-buttons" onClick={this.nextDate}><span className="fa fa-arrow-right"/></button>
                    </div>
                </header>

                <div className="container">
                    <TaskListComponent/>
                </div>
            </div>
        );
    }
}

export default AppComponent;
