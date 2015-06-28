
// These two lines are required to initialize Express in Cloud Code.
 express = require('express');
 app = express();

 var plateController = require('cloud/controllers/plate.js');

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

app.get('/', plateController.start);
app.post('/', plateController.postStart);

app.get('/plate/:state/:number', plateController.show);
app.post('/plate/:state/:number', plateController.comment);

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen(5000);
