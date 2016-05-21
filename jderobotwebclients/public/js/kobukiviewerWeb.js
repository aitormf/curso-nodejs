var config={};
$(document).ready(function() {
   
   var viewer;
   load();
   config.controlid="control";
   config.camrightid="camView2";
   config.camleftid="camView";
   config.modelid="model";
   config.stopbtnid="stopR";
   
   $('#start').on('click', function(){
      viewer = new KobukiViewer(config);
      viewer.start();
	});
   $('#stop').on('click', function(){
         viewer.stop();
	});
   
   var resize = function (){
      $(".cam").height( $(".cam").width()*3/4);
      if (viewer && viewer.isRunning()){
         viewer.resizeCameraModel();
      }
      
   };
   
   $(window).resize(resize);
   
   $('#save').on('click', function(){
      config.camrightserv.dir= $('#dirright').val();
      config.camrightserv.port= $('#portright').val();
      config.camrightepname= $('#epright').val();
      config.camleftserv.dir= $('#dirleft').val();
      config.camleftserv.port= $('#portleft').val();
      config.camleftepname= $('#epleft').val();
      config.motorserv.dir= $('#dirmotors').val();
      config.motorserv.port= $('#portmotors').val();
      config.motorsepname= $('#epmotors').val();
      config.pose3dserv.dir= $('#dirpose3d').val();
      config.pose3dserv.port= $('#portpose3d').val();
      config.pose3depname= $('#eppose3d').val();
      config.laserserv.dir= $('#dirlaser').val();
      config.laserserv.port= $('#portlaser').val();
      config.laserepname= $('#eplaser').val();
      localStorage["kobukiviewer"]=JSON.stringify(config);
	});
   
   resize();
});

function load(){
   if (localStorage.getItem("kobukiviewer")) {
       config = JSON.parse(localStorage.getItem("kobukiviewer"));
      $('#dirright').val(config.camrightserv.dir);
      $('#portright').val(config.camrightserv.port);
      $('#epright').val(config.camrightepname);
      $('#dirleft').val(config.camleftserv.dir);
      $('#portleft').val(config.camleftserv.port);
      $('#epleft').val(config.camleftepname);
      $('#dirmotors').val(config.motorserv.dir);
      $('#portmotors').val(config.motorserv.port);
      $('#epmotors').val(config.motorsepname);
      $('#dirpose3d').val(config.pose3dserv.dir);
      $('#portpose3d').val(config.pose3dserv.port);
      $('#eppose3d').val(config.pose3depname);
      $('#dirlaser').val(config.laserserv.dir);
      $('#portlaser').val(config.laserserv.port);
      $('#eplaser').val(config.laserepname);
     
    } else{
      config.camrightserv={};
      config.motorserv={};
      config.pose3dserv={};
      config.laserserv={};
      config.camleftserv={};
      config.camrightserv.dir= $('#dirright').val();
      config.camrightserv.port= $('#portright').val();
      config.camrightepname= $('#epright').val();
      config.camleftserv.dir= $('#dirleft').val();
      config.camleftserv.port= $('#portleft').val();
      config.camleftepname= $('#epleft').val();
      config.motorserv.dir= $('#dirmotors').val();
      config.motorserv.port= $('#portmotors').val();
      config.motorsepname= $('#epmotors').val();
      config.pose3dserv.dir= $('#dirpose3d').val();
      config.pose3dserv.port= $('#portpose3d').val();
      config.pose3depname= $('#eppose3d').val();
      config.laserserv.dir= $('#dirlaser').val();
      config.laserserv.port= $('#portlaser').val();
      config.laserepname= $('#eplaser').val();
    } 
}