const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const csrf = require('csurf');

const { createServer } = require('http');
const { Server } = require('socket.io');
const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/Domomaker';

mongoose.connect(dbURI, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

const redisURL = process.env.REDISCLOUD_URL
  || 'redis://default:pcasEL0vmXu185rc1pH45wjVq2xwGcUD@redis-12670.c84.us-east-1-2.ec2.cloud.redislabs.com:12670';

const redisClient = redis.createClient({
  legacyMode: true,
  url: redisURL,
});
redisClient.connect().catch(console.error);

const app = express();

app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false,
}));
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    client: redisClient,
  }),
  secret: 'Rhythm Type',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());

app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  console.log('Missin CSRF token!');
  return false;
});

router(app);

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('changedLobby', (lobbyInfo) => {
    socket.broadcast.to(`Room${lobbyInfo.raceCode}`).emit('changedLobby', lobbyInfo);
  });

  socket.on('startedRace', () => {
    io.emit('startedRace');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(port, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${port}`);
});
