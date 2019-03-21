import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

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
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/todos/'+ this.props.match.params.id)
      .then(response => {
        this.setState({
          todoDescription: response.data.todoDescription,
          todoResponsible: response.data.todoResponsible,
          todoPriority: response.data.todoPriority,
          todoCompleted: response.data.todoCompleted
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  onChangeTodoDescription (e) {
    this.setState({
      todoDescription: e.target.value
    });
  }

  onChangeTodoResponsible (e) {
    this.setState({
      todoResponsible: e.target.value
    });
  }

  onChangeTodoPriority (e) {
    this.setState({
      todoPriority: e.target.value
    });
  }

  onChangeTodoCompleted (e) {
    this.setState({
      todoCompleted: !this.state.todo_completed
    });
  }

  onSubmit (e) {
    e.preventDefault();

    const updateTodo = {
      todoDescription: this.state.todoDescription,
      todoResponsible: this.state.todoResponsible,
      todoPriority: this.state.todoPriority,
      todoCompleted: this.state.todoCompleted
    };

    console.log(updateTodo);
    axios.post('http://localhost:3000/todos/update/'+ this.props.match.params.id, updateTodo)
      .then(res => console.log(res.data));

    //this.props.history.push('/');  
  }

  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Update Todo</h3>
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
            <input type="submit" value="Update Todo" className="btn btn-primary" />
          </div>
        </form>
      </div>    
    )
  }
}