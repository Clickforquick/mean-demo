// the users model to handle CRUD operations , like adding users, updating user ,deleting user

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
  firstname: { type: String  },
  lastName: { type: String  },
  username: { type: String  },
  createdBy: { type: String  },
  modifiedBy: { type: String  },
  password: { type: String  },
  role : {type : String }
},{
  timestamps: true
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);