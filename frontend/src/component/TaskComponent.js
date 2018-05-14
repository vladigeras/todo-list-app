import React, {Component} from 'react'
import {Task} from "../model/Task";

export class TaskComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.task.title,
            description: this.props.task.description,
            isImportant: this.props.task.isImportant,

            editing: this.props.task.id == null
        };
    }

    render() {
        if (this.state.editing || this.state.editing == null) {       //edit in process
            return (
                <div className="task-block">
                    <div className="form-group">
                        <input type="text" className="form-control form-control-sm" id="task-title" name="title"
                               placeholder="Enter title" value={this.state.title} onChange={this.handleChangeFields}/>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control form-control-sm" id="task-description" name="description"
                                  placeholder="Enter description" value={this.state.description}
                                  onChange={this.handleChangeFields}/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="task-checkbox" name="isImportant"
                               checked={this.state.isImportant}
                               onChange={this.handleChangeFields}/>
                        <label className="form-check-label" htmlFor="task-checkbox">Is important</label>
                    </div>
                    <div>
                        <button className="btn btn-info task-button-left" onClick={this.saveTask}><i
                            className="fa fa-android icon-in-button"/>Save
                        </button>
                        <button className="btn btn-danger" onClick={this.deleteTask}><i
                            className="fa fa-bomb icon-in-button"/>Delete
                        </button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="task-block" onClick={this.editTask}>
                    <span className="text-monospace">{this.state.title}</span>
                </div>
            )
        }
    }

    handleChangeFields = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({[target.name]: value});
    };

    editTask = () => {
        this.setState({editing: true});
    };

    saveTask = () => {
        this.setState({editing: false});
        this.props.saveTask(new Task(this.state.title, this.state.description, this.state.isImportant), this.props.index);
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.index);
    }
}