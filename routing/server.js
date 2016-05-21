var http = require ("http");
var url = require ("url");
var path = require ("path");

function iniciar (){
   http.createServer(function(req, res){
      var myurl = url.parse(req.url);
      console.log(myurl);
      var mypath = path.parse(decodeURI(req.url));
      console.log(mypath);
      var buscar = path.basename(decodeURI(req.url));
      res.writeHead(200,{"Content-Type": "text/html"});
      res.end("Hola Mundo");
   }).listen(7777);
}

exports.iniciar= iniciar;