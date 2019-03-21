const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Database
mongoose.connect('mongodb://127.0.0.1/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

// Models
const TodoModel = require('./models/todo-model');

// Routes
const todoRoutes = express.Router();
app.use('/todos', todoRoutes);

todoRoutes.route('/').get((req, res) => {
  TodoModel.find((err, todos) => {
    return (err) 
      ? console.log(err)
      : res.json(todos)
  });
});
    
todoRoutes.route('/:id').get((req, res) => {
  let id = req.params.id;
  TodoModel.findById(id, (err, todo) => {
    res.json(todo);
  });
});

todoRoutes.route('/add').post((req, res) => {
  let todo = new TodoModel(req.body);
  todo.save()
    .then(todo => {
      res.status(200).json({'todo': 'todo added successfully'});
    })
    .catch(err => {
      res.status(400).send('adding new todo failed');
    });
});

todoRoutes.route('/update/:id').post((req, res) => {
  TodoModel.findById(req.params.id, (err, todo) => {
    if (!todo) {
      res.status(404).send("data is not found");
    }       
    else {      
      todo.todoDescription = req.body.todoDescription;
      todo.todoResponsible = req.body.todoResponsible;
      todo.todoPriority = req.body.todoPriority;
      todo.todoCompleted = req.body.todoCompleted;

      todo.save()
        .then(todo => {
          res.json('Todo updated!');
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    }  
  });
});

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});