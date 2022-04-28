const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getUsername', mid.requiresLogin, controllers.Account.getUsername);
  app.get('/getCar', mid.requiresLogin, controllers.Car.getCar);
  app.post('/getStanding', mid.requiresLogin, controllers.Lobby.getStanding);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/app', mid.requiresLogin, controllers.Domo.makerPage);

  app.get('/car', mid.requiresLogin, controllers.Car.carPage);
  app.post('/car', mid.requiresLogin, controllers.Car.makeCar);

  app.get('/premium', mid.requiresLogin, controllers.Account.getPremium);
  app.post('/premium', mid.requiresLogin, controllers.Account.setPremium);

  app.post('/createLobby', mid.requiresLogin, controllers.Lobby.createLobby);
  app.post('/joinLobby', mid.requiresLogin, controllers.Lobby.joinLobby);
  app.post('/leaveLobby', mid.requiresLogin, controllers.Lobby.leaveLobby);

  app.get('/generateParagraph', mid.requiresLogin, controllers.TextGenerator.generateParagraph);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
