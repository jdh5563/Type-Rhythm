const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getUsername', mid.requiresLogin, controllers.Account.getUsername);
  app.get('/getCar', mid.requiresLogin, controllers.Car.getCar);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/app', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/app', mid.requiresLogin, controllers.Domo.makeDomo);

  app.get('/car', mid.requiresLogin, controllers.Car.carPage);
  app.post('/car', mid.requiresLogin, controllers.Car.makeCar);

  app.post('/createLobby', mid.requiresLogin, controllers.Lobby.createLobby);
  app.post('/joinLobby', mid.requiresLogin, controllers.Lobby.joinLobby);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
