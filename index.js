var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// allow CORS on all pages - terrible practice but used for example
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: "30931ad7",
  application_key: "cca5d452fbebfa4c37fbf71859eb5c2b"
});

app.post('/submit.json', function (request, response) {

      var data = request.body;
      console.log(data);
      var txt = JSON.stringify(data);

      textapi.combined({
        'text': txt,
        'endpoint': ["entities", "concepts", "classify", "hashtags"]
      }, function(error, result, rateLimits) {
        if (error === null) {
            console.log(rateLimits);
            result.results.forEach(function(r) {
            console.log(r.endpoint + ':');
            console.log(r.result);
          });
             response.writeHead(200, {'Content-Type': 'text/plain'});
              response.end(JSON.stringify(result));
        } else {
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.end(JSON.stringify(error));
              }
      });   
      
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


