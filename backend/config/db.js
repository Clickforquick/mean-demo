/**
 *
 *    This file is used to connect to DB and
 *    create classes that can be used to make DB operations
 *
 *    Global variables created are the classes that will be used.
 *
 */
var   mongoose = require('mongoose');
var   dbError = 'Looks like there is error conneting to DB';
var url = "mongodb://localhost:27017/tallgrass";

/**
 * We export methods that return class object (Schema constructor function)
 *
 * Note that these classes will be created when we connect to Database
 */
module.exports = {
  connect: function(url, options, callBack) {
    console.log('\n db.connect :: method entry');
    mongoose.connect(url, options, function(err, db) {
      if (err) {
        console.log('\n db.connect :: db connection error');
        console.log(dbError);
        return dbError;
      }
		console.log('connected to db : ' + url);
      	return db.once('open', function() {
        // we're connected!
        console.log("Connected correctly to server");
        });
    });
  },
   disconnect: function() {
    mongoose.connection.close();
  }
}