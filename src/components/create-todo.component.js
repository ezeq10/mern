import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

  constructor (props) {
    super(props);

    this.state = {
      todoDescription: '',
      todoResponsible: '',
      todoPriority: '',
      todoCompleted: false    
    };

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeTodoDescription (e) {
    e.preventDefault();
    this.setState({
      todoDescription: e.target.value
    });
  }

  onChangeTodoResponsible (e) {
    e.preventDefault();
    this.setState({
      todoResponsible: e.target.value
    });
  }

  onChangeTodoPriority (e) {
    e.preventDefault();
    this.setState({
      todoPriority: e.target.value
    });
  }

  onSubmit (e) {
    e.preventDefault();

    const newTodo = {
      todoDescription: this.state.todoDescription,
      todoResponsible: this.state.todoResponsible,
      todoPriority: this.state.todoPriority,
      todoCompleted: this.state.todoCompleted
    };

    axios.post('http://localhost:3000/todos/add', newTodo)
      .then(res => console.log(res.data));

    this.setState({
      todoDescription: '',
      todoResponsible: '',
      todoPriority: '',
      todoCompleted: false
    });
  }

  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Description: </label>
            <input type="text"
                    className="form-control"
                    value={this.state.todoDescription}
                    onChange={this.onChangeTodoDescription}
                    />
          </div>
          <div className="form-group">
              <label>Responsible: </label>
              <input type="text" 
                      className="form-control"
                      value={this.state.todoResponsible}
                      onChange={this.onChangeTodoResponsible}
                      />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input className="form-check-input" 
                      type="radio" 
                      name="priorityOptions" 
                      id="priorityLow" 
                      value="Low"
                      checked={this.state.todoPriority==='Low'} 
                      onChange={this.onChangeTodoPriority}
                      />
                <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" 
                      type="radio" 
                      name="priorityOptions" 
                      id="priorityMedium" 
                      value="Medium" 
                      checked={this.state.todoPriority==='Medium'} 
                      onChange={this.onChangeTodoPriority}
                      />
                <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" 
                      type="radio" 
                      name="priorityOptions" 
                      id="priorityHigh" 
                      value="High" 
                      checked={this.state.todoPriority==='High'} 
                      onChange={this.onChangeTodoPriority}
                      />
                <label className="form-check-label">High</label>
            </div>
        </div>
          <div className="form-group">
            <input type="submit" value="Create Todo" className="btn btn-primary" />
          </div>
        </form>
      </div>    
    )
  }
}