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
  Task.findOneAndUpdate({
    _id: req.params.taskId
  }, req.body, {
    new: true
  }, function(err, task) {
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
    res.json({
      message: 'Task successfully deleted'
    });
  });
};


//Chrome Video Extension Routes


exports.add_user = function(req, res) {
  var new_user = new User({
    nickname: req.params.nickname
  });
  console.log(new_user);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.does_user_exist = function(req, res) {
  User.findOne({
    "nickname": req.params.nickname
  }, function(err, user) {
    if (err)
      res.send(err);
    var found = true;
    console.log(user);
    if (user == null)
      found = false;
    res.json({
      "found": found
    });
  });
};

exports.generate_session = function(req, res) {
  var session_id = generate_random_id();

  var session_found = false;
  var query_active = true;

  while (query_active) {
    Session.findOne({
      sessionId: session_id
    }, function(err, sess) {
      if (err) {
        console.log("Error")
      }
      if (sess) {
        session_found = true;
      }
    });

    if (session_found) {
      session_id = generate_random_id();
    } else {

      // Add session to DB with user nickname
      var my_session = new Session({
        sessionId: session_id
      });
      console.log(my_session);
      my_session.save(function(err, session) {
        if (err) res.send(err);
        res.json(session);
      });

      // exit the loop
      query_active = false;
    }
  }

}

function generate_uniquue_session(session_id) {
  return Session
    .findOne({
      sessionId: session_id
    })
    .then(function(session) {
      if (session) {
        console.log("Session found, trying again");
        new_id = generate_random_id();
        return generate_uniquue_session(new_id);
      }
      console.log("Found unique id");
      return session_id;
    })
    .catch(function(err) {
      console.log(error);
    });


}

function generate_random_id() {
  var firstChar = (Math.floor(Math.random() * 10)).toString();
  var secondChar = (Math.floor(Math.random() * 10)).toString();
  var thirdChar = (Math.floor(Math.random() * 10)).toString();
  var fourthChar = (Math.floor(Math.random() * 10)).toString();
  var fifthChar = (Math.floor(Math.random() * 10)).toString();
  var sixthChar = (Math.floor(Math.random() * 10)).toString();
  var seventhChar = (Math.floor(Math.random() * 10)).toString();
  var eighthChar = (Math.floor(Math.random() * 10)).toString();

  return firstChar + secondChar + thirdChar + fourthChar + fifthChar + sixthChar + seventhChar + eighthChar;
}
