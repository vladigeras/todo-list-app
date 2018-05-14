import React, {Component} from 'react'
import {Task} from "../model/Task";
import {TaskComponent} from "./TaskComponent";
import axios from 'axios'
import moment from "moment";

export class TaskListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: Array[Task] = []
        };
    }

    componentDidMount() {
        this.getTasksByDate(this.props.date);
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.getTasksByDate(nextProps.date);
    }

    render() {
        const {tasks} = this.state;

        return (
            <div>
                <button className="date-buttons" onClick={this.createTask}>+</button>
                <ul>
                    {
                        tasks.map((t: Task, k: number) => <li key={k} className="tasks-li"><TaskComponent
                            index={k}
                            deleteTask={this.deleteTask}
                            saveTask={this.saveTask}
                            task={t}/>
                        </li>)
                    }
                </ul>
            </div>
        )
    }

    createTask = () => {
        let tasks = this.state.tasks;
        tasks.push(new Task());
        this.setState({tasks: tasks})
    };

    deleteTask = (index) => {
        let tasks = this.state.tasks;
        let deleted = tasks[index];

        if (deleted.id !== undefined) { //delete from server
            axios.delete("/task/" + deleted.id).then(res => {
                console.log("Task was deleted successful");
                this.getTasksByDate(this.props.date)
            });
        } else {    //delete from array

        }
    };

    saveTask = (task: Task) => {
        if (task.id == null) {      //create new
            task.date = moment(this.props.date, "DD.MM.YYYY").format("YYYY-MM-DD");    //server wait this date format
            axios.post("/task/", task).then(res => {
                console.log("Task was saved successful");
                this.getTasksByDate(this.props.date)
            })
        } else {    //update existing
            console.log(task.id)
        }
    };

    getTasksByDate(date) {
        this.setState({tasks: []});
        axios.get("/task?date=" + date).then(res => {
            let tasks = res.data;
            this.setState({tasks: tasks})
        })
    }
}
