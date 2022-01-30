import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
            { name: '1', stage: 0 },
            { name: '2', stage: 0 },
        ],
        taskNameInput: ''
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  onTaskNameInputChange = (e) => {
    this.setState({
      taskNameInput: e.target.value
    });
  }

  addTask = () => {
    if (this.state.taskNameInput) {
      const tempTasks = this.state.tasks;
      tempTasks.push({
        name: this.state.taskNameInput, stage: 0
      });

      this.setState({
        tasks: tempTasks, taskNameInput: ''
      });
    }
  }

  removeTask = (name) => {
    let tempTasks = this.state.tasks;
    tempTasks = tempTasks.filter(e => e.name != name);

    this.setState({
      tasks: tempTasks
    });
  }

  moveForward = (name) => {
    let tempTasks = this.state.tasks;
    tempTasks = tempTasks.map((task) => {
      if (task.name == name) return { name: task.name, stage: task.stage == 3 ? 3 : task.stage + 1 };
      else return task;
    });

    this.setState({
      tasks: tempTasks
    });
  }

  moveBackward = (name) => {
    let tempTasks = this.state.tasks;
    tempTasks = tempTasks.map((task) => {
      if (task.name == name) return { name: task.name, stage: task.stage == 0 ? 0 : task.stage - 1 };
      else return task;
    });

    this.setState({
      tasks: tempTasks
    });
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input" value={this.state.taskNameInput} onChange={this.onTaskNameInputChange}/>
          <button type="submit" className="ml-30" data-testid="create-task-button" onClick={this.addTask}>Create task</button>
        </section>

        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{this.stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                        <div className="icons">
                                          <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`} onClick={() => this.moveBackward(task.name)}>
                                            <i className="material-icons">arrow_back</i>
                                          </button>
                                          <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`} onClick={() => this.moveForward(task.name)}>
                                            <i className="material-icons">arrow_forward</i>
                                          </button>
                                          <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`} onClick={() => this.removeTask(task.name)}>
                                            <i className="material-icons">delete</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
}