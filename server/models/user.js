const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


//Define our model.

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  TagReducer:{ type: Object, default: {} },
  TaskReducer:{ type: Object, default: {} }

});

// On Save Hook, encrypt password
// before saving the model, run this function.
userSchema.pre('save', function(next){
  if(this.password.length === 60){
    return next();
  }
  // generate a salt.
  bcrypt.genSalt(10, (err, salt)=>{
    if(err) { return next(err); }

    // encrypt the password using salt.
    bcrypt.hash(this.password, salt, null, (err, hash)=>{
      if(err){ return next(err); }
      // overwrite password.
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {  
    if (err) { return callback(err); }
    callback(null, isMatch);

  });
}

//Create the model class.

const ModelClass = mongoose.model('user', userSchema);


//Export the model.

module.exports = ModelClass;
