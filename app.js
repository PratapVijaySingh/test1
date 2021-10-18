require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors = require('cors');
const app = express();
const session    = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");




var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3001");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
app.use(allowCrossDomain);
app.use(passport.initialize());
require("./middlewares/passport")(passport);

const mongoDB = 'mongodb+srv://entrpnr-notrs:9YBhUUNyCxzmqwOV@clusternotrs.3ia21.mongodb.net/ticketsys?retryWrites=true&w=majority'

// const mongoDB = 'mongodb+srv://varun:varun01!@cluster0.fonkr.mongodb.net/reactTicket?retryWrites=true&w=majority'
mongoose.connect(mongoDB,{
  useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
.then(()=>{
  console.log(`connection sucessful`)
})
.catch((err)=> console.log(err))


//const MONGODB_URI = 'mongodb+srv://oF0DluVd3TxaWOh5@admin:FcXuCuEXiIYZzNf4@cluster0.86eiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


/*
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://oF0DluVd3TxaWOh5:FcXuCuEXiIYZzNf4@cluster0.86eiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
   //return self.connection.dropDatabase();
   //return self.connection.dropDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })*/


const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
app.use(cors({
  origin:true,
   credentials:true
}))
// Middleware Setup
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000 },
  proxy:true,
  resave:true,
  saveUninitialized: true

  
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// Express View engine setup

// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
const ticket = require('./routes/ticket')
const login = require('./routes/login');
const signup = require('./routes/signup');
const logout = require('./routes/logout');
const nodemail = require('./routes/nodemailer');

app.use('/', index);
app.use('/',ticket);
app.use('/',login);
app.use('/',logout)
app.use('/',signup)
app.use('/',nodemail)



module.exports = app;
