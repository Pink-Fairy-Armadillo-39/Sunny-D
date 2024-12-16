const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// User Schema
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: {type: String, required: true}, 
  days: [{ date: String, points: Number }]
});


UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(10, function (saltError, salt) {
    if (saltError) {
      return next(saltError);
    } else {
      bcrypt.hash(user.password, salt, function (hashError, hash) {
        if (hashError) {
          return next(hashError);
        } else {
          user.password = hash;
          console.log('this is user password ---> ', user.password);
          return next();
        }
      });
    }
  });
});

UserSchema.methods.comparePassword = function (enteredPassword, callback) {
  console.log('this is entered password and this password --> ', enteredPassword, this.password);
  bcrypt.compare(enteredPassword, this.password, (err, isMatch) => {
    console.log('this is matched ---> ', isMatch);
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};




const User = mongoose.model('users', UserSchema);


module.exports = User;