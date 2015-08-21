var express     = require('express'); // Get the library
var bodyParser  = require('body-parser'); // Lets use body parser
var mongoose    = require('mongoose'); // Get the mongoose library

var app         = express(); // Create app object
var server      = require('http').Server(app);
var socketio    = require('socket.io');
var io          = require('socket.io')(server);


var passport    = require('passport');
var flash       = require('connect-flash');
var morgan      = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var path         = require('path');
// Let's define a schema to be used with the Book model

require('./config/passport')(passport); // pass passport for configuration
app.use(express.static(path.join(__dirname, 'public')));
// set up our express application

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages

app.set('port', process.env.PORT || 5000);
var bookSchema = mongoose.Schema({
  name: String
});
// Let's create a Book model using the abovecreated bookSchema
var Book = mongoose.model('Book', bookSchema);

var myMongo = 'mongodb://ceebulo:qwerty@ds031613.mongolab.com:31613/project3_jjc'

mongoose.connect(myMongo);

console.log(myMongo);

var mongodburi = process.env.MONGODBURI;

// create a mongoose connection object to attach event listeners
var db = mongoose.connection;
// let's attach an event listener for connection errors
db.on('error', console.error.bind(console, 'connection error:'));
// let's attach an event listener to run one time when the connection opens
db.once('open', function(someData){
  console.log('boom! we are connected to mongo');
});


// Lets create a logger middleware
app.use(function(request, response, next){
  console.log('request received %s %s ', request.method, request.url);
  next();
});

app.use(bodyParser.json());

// var books = [
//   {id: 17, name: 'bible'}
// , {id: 21, name: "qur'an"}
// , {id: 35, name: 'torah'}
// , {id: 48, name: 'principia matematica'}
// , {id: 50, name: 'sruti'}
// , {id: 63, name: 'rastafari book'}];
//
// app.get('/', function(request, response){
//   console.log(__dirname);
//   response.sendFile(__dirname + '/index_jquery.html');
// });
//
// app.get('/books', function(request, response){
//   Book.find({}, function(err, books){
//     if (err){
//       console.log(err);
//       return;
//     }
//     response.json(books);
//   });
// });
//
// app.post('/books', function(request, response){
//   console.log(request.body);
//   // Let's put a book in the database
//   Book.create(request.body, function(err, bookThatGotSaved){
//     if (err){
//       // log the error so the developer understands there is an error
//       console.log(err);
//       // exit out this function
//       return;
//     }
//     else {
//       console.log('succesfully saved ', bookThatGotSaved);
//       response.json(bookThatGotSaved);
//     }
//   });
// });
//
// // Lets get an individual book by id
// app.get('/books/:id', function(request, response){
//   // lets find the book using mongoose
//   Book.findOne({_id: request.params.id}, function(err, book){
//     if (err){
//       console.log(err);
//       return
//     }
//     response.json(book);
//   })
// });
//
// app.delete('/books/:id', function(request, response){
//   Book.remove({_id: request.params.id}, function(err, book){
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log('succesfully destroyed book with id', request.params.id);
//     response.json({'message': 'succesfully deleted'});
//   });
// });

io.on('connect', function(socket){
  console.log('connected');
  socket.on('new-user', function(data){
    console.log("new user with name of "+data.name)
    io.emit('add-user', data)
  })

  socket.on('fb', function(data){
    console.log(data);
    io.emit(data);
  })

  socket.on('sending-location', function(data){
    console.log(data);
    io.to(data.receiver).emit('private-location', data);
  })

  socket.on('testing', function(data){
    console.log(data);
    io.emit('testing', data);
  })

  socket.on('arrow-test', function(data){
    io.emit('arrow-test', data)
    })

//begin new attempt at user tracking, wednesday
//////////////////////////////////////////////
  socket.on('arrowSocket', function(data){
    console.log(data);
    io.emit('arrowSocket', data);
  })


////end new attempt at user tracking
////////////////////////////////////

  })

require('./models/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

server.listen(app.get('port'), function(){
  console.log("Server started, lets get down");
});
