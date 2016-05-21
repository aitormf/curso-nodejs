var http = require ("http");
var querystring = require("querystring");
var util = require ("util");
var form = require("fs").readFileSync("form.html");
var maxData = 12* 1024 * 1024;

http.createServer (function(req,res){
   if (req.method==="POST"){
      var postdata="";
      req.on("data",function(chunk){
         postdata+=chunk;
         if (postdata.length > maxData){
            postdata="";
            this.pause();
            res.writeHead (413);
            res.end("demasiado larga");
         }
      }).on ("end",function(){
         if(!postdata){response.end(); return;} //Evita peticiones vacias
         var postDataObject= querystring.parse(postdata);
         console.log("recibido: "+postdata);
         res.end("escrito: "+ util.inspect(postDataObject));
      });
   }
   if (req.method === "GET"){
      res.writeHead(200,{"Content-Type": "text/html"});
      res.end(form);
   }
}).listen(7777);