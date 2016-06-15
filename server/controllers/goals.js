const User = require('../models/user');
const Goal = require('../models/goal');

exports.fetchGoals = function(req, res) {
  const userId = req.body.uid;
  User.findOne({ _id: userId}, function(err, result) {
    if(err) { return err; }
    const userGoals = result.goals;

    Goal.find({'_id': { $in: userGoals }}, function(err, result) {
      if(err) { return err }
      console.log("fetch :", result);
      res.send({ goals: result})
    })
  });
}

exports.deleteGoal = function(req, res) {
  console.log("delete goal req: ", req.body)
  const uid = req.body.uid;
  const gid = req.body.gid;

  User.findByIdAndUpdate(uid, { $pull: { 'goals': gid }}, function(err, result) {
    if(err) { return err; }
    const userGoals = result.goals;

    Goal.find({'_id': { $in: userGoals }}, function(err, result) {
      if(err) { return err }
      console.log("Delete Goal find: ", result)
    });
  })

  User.findOne(uid, function(err, result) {
    if(err) { return err; }
    const userGoals = result.goals;

    Goal.find({'_id': { $in: userGoals }}, function(err, result) {
      if(err) { return err }
      console.log("goals: ", result);
      res.send({ goals: result})
    })
  })
}

exports.addGoal = function(req, res) {
  const uid = req.body.uid;
  const goal = req.body.goal;
  const dueDate = req.body.dueDate;
  const newGoal = new Goal({goal: goal, dueDate: dueDate});

  newGoal.save(function(err, result) {

    if(err) { return err; }
    console.log("new goal saved to db: ", result._id)

    User.findByIdAndUpdate(uid, {$push:{ 'goals': result._id}}, function(err) {
      if(err) { return err; }
    })

    User.findOne(uid, function(err, result) {
      if(err) { return err; }
      const userGoals = result.goals;

      Goal.find({'_id': { $in: userGoals }}, function(err, result) {
        if(err) { return err }
        console.log("goals: ", result);
        res.send({ goals: result})
      })
    })
  })
}
