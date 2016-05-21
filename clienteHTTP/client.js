var http = require("http");
var url = require("url");

var urlOpts = {host: "as.com", path: "/", port: "80"};

//console.log("hola que tal");
if (process.argv[2]){
   if (!process.argv[2].match("http://")) {
      process.argv[2] = "http://" + process.argv[2];
   }
   urlOpts = url.parse(process.argv[2]);
}

http.get(urlOpts,function(resp){
   resp.on ("data", function (chunk){
      console.log(chunk.toString());
   });

}).on("error", function(e){
   console.error("error: "+ e.message);
});
