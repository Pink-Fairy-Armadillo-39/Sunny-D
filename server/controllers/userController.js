const User = require('../userModel');

const userController = {};

userController.updateUser = async (req, res, next) => {
  try {
    //destructuring username, date, points from request
    const { username, date, points } = req.body;
    //searching DB for matching username 
    const user = await User.findOne({ username });
    //if user doesnt exist, create new user with username, days property associated with date and points
    if (!user) {
      const newUser = await User.create({ username, days: [{ date, points }] });
      //set totalPoints property on local res to points
      res.locals.totalPoints = points;
      //send back to server
      return next();
      //if user exists
    } else {
      //create index equal to exising days property (array) on user DB - 1 (last item in array)
      const index = user.days.length - 1;
      const currentDate = user.days[index];
      //adding to total points (for bar at bottom of screen)
      const newPoints = currentDate.points + points;
      //if final element in array is equal to date in req body
      if (currentDate.date === date) {
        //update index and points in user DB
        const update = await User.findOneAndUpdate(
          { username },
          { $set: { [`days.${index}.points`]: newPoints } },
          { new: true }
        );
        //update totalPoints property on response to new points
        res.locals.totalPoints = update.days[index].points;
        return next();
        //if current date does not equal date in req body
      } else {
        // update variable might not be unnecessary
        const update = await User.findOneAndUpdate(
          { username },
          { $push: { days: { date, points } } },
          { new: true }
        );
        res.locals.totalPoints = points;
        return next();
      }
    }
    //if theres an error, return the error
  } catch (err) {
    return next({
      log: 'Error in userController.updateUser: ' + err,
      status: 418,
      message: { err: 'An error occurred in userController.updateUser' },
    });
  }
};


userController.getUser = (req, res, next) => {
  //destructures username from req parameters 
  const { username } = req.params;
  //searches database for username
  User.findOne({ username: username })
    .then((data) => {
      //if matching username is found in DB, set data property on local response to the last element in the data.days array
      if (data) res.locals.data = data.days.pop();
      //otherwise, set data as 0
      else res.locals.data = 0;
      return next();
    });
};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  const newUser = User.create({ username: username, password: password })
  res.locals.newUser = newUser;
  return next();
}








module.exports = userController;