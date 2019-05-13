const fs = require('fs');
module.exports = {
  addTaskPage: (req, res) => {
    res.render('add-task.ejs', {
      pageTitle: 'Add a Task',
      message: ''
    });
  },
  addTask: (req, res) => {
    let message = '';
    let user_name = req.body.user_name;
    let task_name = req.body.task_name;
    let task_description = req.body.task_description;
    let task_deadline = req.body.task_deadline;

    
    let query = "INSERT INTO `tasks` (user_name, task_name, task_description, task_deadline) VALUES ('" + user_name + "', '" + task_name + "', '" + task_description + "', '" + task_deadline +"')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  },
  editTaskPage: (req, res) => {
    let taskId = req.params.id;
    let query = "SELECT * FROM `tasks` WHERE id = '" + taskId + "'";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('edit-task.ejs', {
        pageTitle: 'Edit Task',
        task: result[0],
        message: ''
      });
    });
  },
  editTask: (req, res) => {
    let taskId = req.params.id;
    let user_name = req.body.user_name;
    let task_name = req.body.task_name;
    let task_description = req.body.task_description;
    let task_deadline = req.body.task_deadline;
    let query = "UPDATE `tasks` SET `user_name` = '" + user_name + "', `task_name` = '" + task_name + "', `task_description` = '" + task_description + "', `task_deadline` = '" + task_deadline + "' WHERE `id` = '" + taskId + "'";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  },
  deleteTask: (req, res) => {
    let taskId = req.params.id;
    let deleteQuery = 'DELETE FROM tasks WHERE id = "' + taskId + '"';
    db.query(deleteQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  }
}