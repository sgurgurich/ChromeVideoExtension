'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
  id : int,
  isBuffering : boolean,
  isPlaying: boolean,
  lastActivity: {
    type: Date,
    default: Date.now
  }

});

var SessionUsersSchema = new Schema({
  id : int,
  sessionId: int,
  nickname: String,
  isPageLoaded: Boolean
});

var UserSchema = new Schema({
  id : int,
  nickname : String,
  lastConnected : {
    type: Date,
    default: Date.now
  }
});

var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
module.exports = mongoose.model('Sessions', SessionSchema);
module.exports = mongoose.model('SessionUsers', SessionUsersSchema);
module.exports = mongoose.model('User', UserSchema);
