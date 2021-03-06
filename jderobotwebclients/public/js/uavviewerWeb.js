
var config={};
var realEP={
   cam: "ardrone_camera",
   pose3d: "ardrone_pose3d",
   cmdvel: "ardrone_cmdvel",
   extra: "ardrone_extra"
};
var simEP={
   cam: "Camera",
   pose3d: "ImuPlugin",
   cmdvel: "CMDVel",
   extra: "Extra"
};

function putDfEP (eps){
   $('#epcam1').val(eps.cam);
   $('#eppose3d').val(eps.pose3d);
   $('#epextra').val(eps.extra);
   $('#epcmdvel').val(eps.cmdvel);
}
$(document).ready(function() {
   var client;
   load();
   config.control1id="control1";
   config.control2id="control2";
   config.cam1id="camView";
   config.modelid="model";
   config.takeoffbtnid="takeoff";
   config.resetbtnid="reset";
   config.landbtnid="land";
   config.togcambtnid="toggle";
   config.stopbtnid="stopb";
   config.attitudeid="attitude";
   config.headingid="heading";
   config.altimeterid="altimeter";
   config.turn_coordinatorid="turn_coordinator";
   
   $('#start').on('click', function(){
		client = new UavViewer(config);
         client.start();
      $("canvas.border-light").removeClass("border-light");
	});
   $('#stop').on('click', function(){
         client.stop();
	});
   
    $('#DfReal').on('click', function(){
         putDfEP(realEP);
	});
    $('#DfGazebo').on('click', function(){
         putDfEP(simEP);
	});
   
   
   var resize = function (){
      $(".cam").height( $(".cam").width()*9/16);
      if (client && client.isRunning()){
         client.resizeCameraModel();
      }
      
      $(".instrument").width($("#camView").height()/5);
      $(".instrument").height($("#camView").height()/5);
      
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
      localStorage["uavviewer"]=JSON.stringify(config);
	});
   
   function sameaddr (){
      var value = $( "#globaladdr" ).val();
      $( ".in-addr" ).val( value );
   }
   
   $( "#globaladdr" ).keyup(sameaddr);
   
   $('#sa-toggle').change(function(evt) {
       $(".in-addr").prop('disabled',!$(".in-addr").prop('disabled'));
       $("#globaladdr").prop('disabled',!$("#globaladdr").prop('disabled'));
      if ($(this).prop('checked')){
         sameaddr();
      }
    });
   
   resize();
   
   var pfx = ["webkit", "moz", "ms", "o", ""];
   function RunPrefixMethod(obj, method) {
	
	  var p = 0, m, t;
	  while (p < pfx.length && !obj[m]) {
		m = method;
		if (pfx[p] == "") {
			m = m.substr(0,1).toLowerCase() + m.substr(1);
		}
		m = pfx[p] + m;
		t = typeof obj[m];
		if (t != "undefined") {
			pfx = [pfx[p]];
			return (t == "function" ? obj[m]() : obj[m]);
		}
		p++;
	  }
   }
   
   var fullScreen = function(){
      var canvas = $("#camView");
      
      if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
		RunPrefixMethod(document, "CancelFullScreen");
         canvas.width("100%");
         //$("#model").show();
	  }
	  else {
		RunPrefixMethod(document.getElementById("teleoperator"), "RequestFullScreen");
         canvas.width($( window ).width());
         //$("#model").hide();
	  } 
   };
   
   
   $("#camView").on("click", fullScreen);
   $("#camView").on("touchstart", fullScreen);
   
});

function load(){
   if (localStorage.getItem("uavviewer")) {
       config = JSON.parse(localStorage.getItem("uavviewer"));
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