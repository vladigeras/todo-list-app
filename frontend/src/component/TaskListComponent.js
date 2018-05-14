import React, {Component} from 'react'
import {Task} from "../model/Task";
import {TaskComponent} from "./TaskComponent";
import axios from 'axios'

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
        tasks.splice(index, 1);
        this.setState({tasks: tasks});
    };

    saveTask = (task: Task, index: number) => {
        let tasks = this.state.tasks;
        tasks[index] = task;
        this.setState({tasks: tasks});

        axios.post("/task/", {
            id: task.id,
            title: task.title,
            description: task.description,
            isImportant: task.isImportant,
            date: this.props.date
        }).then(res => console.log("Task was saved successful"))
    };

    getTasksByDate(date) {
        this.setState({tasks: []});
        axios.get("/task?date=" + date).then(res => {
            let tasks = res.data;
            this.setState({tasks: tasks})
        })
    }
}
