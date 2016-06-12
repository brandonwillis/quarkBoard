const Authentication = require('./controllers/authentication');
const Notes = require('./controllers/notes');
const passportService = require('./services/passport');
const passport = require('passport');

//makes default cookies to false
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app){
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.post('/notes', Notes.fetchNotes);
  app.post('/noteDelete', Notes.deleteNote);
  app.post('/noteAdd', Notes.addNote);
}
