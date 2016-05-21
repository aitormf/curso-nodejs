/*var connect = require ("connect");
var http = require('http');
var util = require ("util");
var form = require("fs").readFileSync("form.html");

var app= connect ();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
//app.use (connect.limit("64kb"));
//app.use (connect.bodyParser());
app.use (function(req,res){

            if (req.method==="POST"){
      
               console.log("recibido: "+req.body);
               res.end("escrito: "+ util.inspect(req.body));
         }
   if (req.method === "GET"){
      res.writeHead(200,{"Content-Type": "text/html"});
      res.end(form);
   }
   });

//app.listen(7777);

http.createServer(app).listen(7777);*/

var connect = require('connect');
var http = require('http');

var app = connect();

// gzip/deflate outgoing responses
//var compression = require('compression');
//app.use(compression());

// store session state in browser cookie
//var cookieSession = require('cookie-session');
//app.use(cookieSession({
//    keys: ['secret1', 'secret2']
//}));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

// respond to all requests
app.use(function(req, res){
   console.log(req.body);
  res.end('Hello from Connect!\n');
});

//create node.js http server and listen on port
http.createServer(app).listen(3000);