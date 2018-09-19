const db = require('./db.js');
const _ = require('lodash');
const Todo = require('./models/Todo').Todo;
const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

let app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  let text = req.body.text;
  let todo = new Todo({text});
  todo.save().then((todo) => {
    res.send(todo);
  }, (err) => {
    res.status(400).send(err);
  })
})

app.get("/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send(todos);
  }).catch((err) => {
    res.status(400).send(err);
  })
})

app.get("/todos/:id", (req, res) => {
  console.log("here");
  let todoId = req.params.id;

  if(!ObjectId.isValid(todoId)){
    res.status(400).send("Invalid id!");
  }

  Todo.findById(todoId).then((todo) => {
    res.send(todo);
  }).catch((err) => {
    res.send(err);
  })
})

app.delete("/todos/:id", (req, res) => {
  let todoId = req.params.id;
  if(!ObjectId.isValid(todoId)){
    res.status(400).send("Invalid id!");
  }

  Todo.deleteOne({
    _id:todoId
  }).then((result) => {
    res.send("deleted !");
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  })

})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  })
});
app.listen(3000, ()=>{
  console.log("app is running on port 3000");
});

module.exports = {app};
