const massive = require('massive')
require('dotenv').config();
const session = require('express-session')

const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts')

const app = express();

const {SERVER_PORT, DB_STRING, SESSION_SECRET} = process.env
app.use(express.json());



//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)


massive({
  connectionString: DB_STRING,
  ssl: { 
    rejectUnauthorized: false 
  }
}).then(dbInstance => {
  app.set('db', dbInstance)

  app.listen(5000, _ => console.log(`DB & Server running on ${SERVER_PORT}`));
}).catch(err => console.log(err))


app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))
