var config={};
$(document).ready(function() {
   
   var client;
   load();
   config.control1id="control1";
   config.control2id="control2";
   config.cam1id="camView";
   config.modelid="model";
   config.takeoffbtnid="takeoff";
   config.landbtnid="land";
   config.togcambtnid="toggle";
   config.stopbtnid="stopb";
   config.attitudeid="attitude";
   config.headingid="heading";
   config.altimeterid="altimeter";
   config.turn_coordinatorid="turn_coordinator";
   
   
   $('#start').on('click', function(){
		client = new IntrorobUav(config);
         client.start();
      $("canvas.border-light").removeClass("border-light");
      //console.log(client);
	});
   $('#stop').on('click', function(){
         client.stop();
	});
   
   var resize = function (){
      $(".cam").height( $(".cam").width()*3/4);
      if (client && client.isRunning()){
         client.resizeCameraModel();
      }
      
   };
   
   
   $(window).resize(resize);
   
   $('#save').on('click', function(){
      config.cam1serv.dir= $('#dircam1').val();
      config.cam1serv.port= $('#portcam1').val();
      config.cam1epname= $('#epcam1').val();
      config.pose3dserv.dir= $('#dirpose3d').val();
      config.pose3dserv.port= $('#portpose3d').val();
      config.pose3depname= $('#eppose3d').val();
      config.extraserv.dir= $('#dirextra').val();
      config.extraserv.port= $('#portextra').val();
      config.extraepname= $('#epextra').val();
      config.cmdvelserv.dir= $('#dircmdvel').val();
      config.cmdvelserv.port= $('#portcmdvel').val();
      config.cmdvelepname= $('#epcmdvel').val();
      localStorage["introrobuav"]=JSON.stringify(config);
	});
   
   $('#myalg').on('click', function(){
	 var icon = $("#icon");
         if (icon.hasClass("glyphicon-play")){
            client.startMyAlgorithm();
            icon.removeClass("glyphicon-play");
            icon.addClass("glyphicon-stop");
         }else{
	        client.stopMyAlgorithm();
            icon.removeClass("glyphicon-stop");
            icon.addClass("glyphicon-play");
	}
	});
   
   resize();
});

function load(){
   if (localStorage.getItem("introrobuav")) {
       config = JSON.parse(localStorage.getItem("introrobuav"));
      $('#dircam1').val(config.cam1serv.dir);
      $('#portcam1').val(config.cam1serv.port);
      $('#epcam1').val(config.cam1epname);
      $('#dirpose3d').val(config.pose3dserv.dir);
      $('#portpose3d').val(config.pose3dserv.port);
      $('#eppose3d').val(config.pose3depname);
      $('#dirextra').val(config.extraserv.dir);
      $('#portextra').val(config.extraserv.port);
      $('#epextra').val(config.extraepname);
      $('#dircmdvel').val(config.cmdvelserv.dir);
      $('#portcmdvel').val(config.cmdvelserv.port);
      $('#epcmdvel').val(config.cmdvelepname);
     
    } else{
      config.cam1serv={};
      config.pose3dserv={};
      config.extraserv={};
      config.cmdvelserv={};
      config.cam1serv.dir= $('#dircam1').val();
      config.cam1serv.port= $('#portcam1').val();
      config.cam1epname= $('#epright').val();
      config.pose3dserv.dir= $('#dirpose3d').val();
      config.pose3dserv.port= $('#portpose3d').val();
      config.pose3depname= $('#eppose3d').val();
      config.extraserv.dir= $('#dirextra').val();
      config.extraserv.port= $('#portextra').val();
      config.extraepname= $('#epextra').val();
      config.cmdvelserv.dir= $('#dircmdvel').val();
      config.cmdvelserv.port= $('#portcmdvel').val();
      config.cmdvelepname= $('#epcmdvel').val();
    }
}