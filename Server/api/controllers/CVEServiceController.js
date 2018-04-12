'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Session = mongoose.model('Session')

//exports.list_all_tasks = function(req, res) {
//  Task.find({}, function(err, task) {
//    if (err)
//      res.send(err);
//    res.json(task);
//  });
//};

//exports.create_a_task = function(req, res) {
//  var new_task = new Task(req.body);
//  new_task.save(function(err, task) {
//    if (err)
//      res.send(err);
//    res.json(task);
//  });
//};

//exports.read_a_task = function(req, res) {
//  Task.findById(req.params.taskId, function(err, task) {
//    if (err)
//      res.send(err);
//    res.json(task);
//  });
//};

//exports.update_a_task = function(req, res) {
//  Task.findOneAndUpdate({
//    _id: req.params.taskId
//  }, req.body, {
//    new: true
//  }, function(err, task) {
//    if (err)
//      res.send(err);
//    res.json(task);
//  });
//};

//exports.delete_a_task = function(req, res) {
//  Task.remove({
//    _id: req.params.taskId
//  }, function(err, task) {
//    if (err)
//      res.send(err);
//    res.json({
//      message: 'Task successfully deleted'
//    });
//  });
//};


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

exports.get_session = function(req, res) {
  Session.findOne({
      sessionId: req.params.sessionid
    },
    function(err, session) {
      if (err) console.log(err);
      var found = false;
      if (session) {
        found = true;
        console.log(session);
        res.json({
          "found": found,
          "userList": session.userList,
          "videoUrl": session.videoUrl
        });
      } else {
        res.json({
          "found": found
        });
      }
    });
}

exports.add_user_to_session = function(req, res) {
  Session.findOneAndUpdate({
      sessionId: req.params.sessionid
    }, {
      $push: {
        userList: req.body.nickname
      }
    }, {
      new: true
    },
    function(err, session) {
      if (err) console.log(err);
      var found = false;
      if (session) {
        found = true;
        console.log(session);
        res.json({
          "found": found,
          "userList": session.userList,
          "videoUrl": session.videoUrl
        });
      } else {
        res.json({
          "found": found,
        });
      }
    });
}

exports.remove_user_from_session = function(req, res) {
  Session.findOneAndUpdate({
      sessionId: req.params.sessionid
    }, {
      $pull: {
        userList: req.body.nickname
      }
    }, {
      new: true
    },
    function(err, session) {
      if (err) console.log(err);
      var found = false;
      if (session) {
        found = true;
        console.log(session);
        res.json({
          "found": found,
          "userList": session.userList,
          "videoUrl": session.videoUrl
        });
      } else {
        res.json({
          "found": found
        });
      }
  });
}

exports.get_session_url = function(req, res){
  Session.findOne({sessionId:req.params.sessionid},
  function(err, session){
    if(err) console.log(err);
    if(session){
      res.json({"videoUrl": session.videoUrl});
    }
    else{
      res.json({"videoUrl": null});
    }
  });
}

exports.set_session_url = function(req, res){
  Session.findOneAndUpdate({sessionId:req.params.sessionid},
  {$set: {videoUrl: req.body.url}},
  {new: true},
function(err,session){
  if(err) console.log(err);
  if(session){
    res.json("success": true);
  }
  else{
    res.json("success": false);
  }
});
}

exports.toDo = function(req, res) {
  res.json({
    data: "Functionality not available yet."
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
