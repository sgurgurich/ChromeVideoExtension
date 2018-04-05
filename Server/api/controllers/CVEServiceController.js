'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  User = mongoose.model('User'),
  Session = mongoose.model('Session'),
  SessionUsers = mongoose.model('SessionUsers');
exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};


//Chrome Video Extension Routes


exports.add_user = function(req, res) {
  var new_user = new User({nickname: req.params.nickname});
  console.log(new_user);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.does_user_exist = function(req, res) {
  User.findOne({"nickname" : req.params.nickname}, function(err, user) {
    if (err)
      res.send(err);
    res.json({"found" : req.params.nickname==user.nickname});
  });
};
