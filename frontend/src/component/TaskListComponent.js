import React, {Component} from 'react'
import {Task} from "../model/Task";
import {TaskComponent} from "./TaskComponent";

export class TaskListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: Array[Task] = []
        };
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
    }
}
