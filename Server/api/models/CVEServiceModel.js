'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
  sessionId : String,
  isBuffering : Boolean,
  isPlaying: Boolean,
  videoUrl: String,
  userList: [String],
  lastActivity: {
    type: Date,
    default: Date.now
  }

});

var UserSchema = new Schema({
  nickname : String,
  lastConnected : {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Session', SessionSchema);
module.exports = mongoose.model('User', UserSchema);
