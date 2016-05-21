/* Data Recived
 * - pose3d:
 *       + x,y,z: coordenadas (metros)
 *       + q1,q2,q3,q4 : quaternion
 *       + yaw, pitch, roll: orientacion (radianes)
 * - cam1:
 *       + data: Array de datos de imagen recibidos
 *       + width, height: Ncho y alto de la imagen recibida en pixeles
 *
 *********************************
 * Data Response
 * - com: command to send to drone. Possible values:
 *   + sendVel : send Velocities 
 *   + takeoff : takeoff drone
 *   + land : land drone
 *   + toggleCam : change camera
 * - linearX,linearY,linearZ,angularZ: velocities 
 * - interval: if the action takes more than time reception sensor (100ms). Possible values:
 *   + 0 : do nothing
 *   + 1 : start interval in main thread
 *   + 2 : stop interval in main thread
 */

function calcDist (a,b){
   return Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2));
}
var step =0;
var origen;
var giro = 1;

onmessage = function(e) {
    
   var pose3d = e.data.pose3d;
   var cam1 = e.data.cam1;
   
   var linearX = 0;
   var linearY = 0;
   var linearZ = 0;
   var angularZ = 0;
   switch (step){
      case 0:
         postMessage({com:"takeoff",interval:0});
         step++;
         origen = pose3d;
         break;
      case 1:
      case 3:
      case 5:
      case 7:
         console.log(calcDist(origen,pose3d));
         if (calcDist(origen,pose3d)<2){
            linearX = 2;
            postMessage({com:"sendVel",linearX:linearX,linearY:0,linearZ:0,angularZ:0,interval:0});
            //console.log("send: linearX");
         }else{
            linearX = 0;
            postMessage({com:"sendVel",linearX:linearX,linearY:0,linearZ:0,angularZ:0,interval:0});
            console.log("send: linearX = 0");
            step++;
         }
         break;
      case 2:
         console.log(Math.PI/2);
         console.log(pose3d.yaw);
         if (Math.PI/2>pose3d.yaw){
            angularZ = 0.1;
            postMessage({com:"sendVel",linearX:0,linearY:0,linearZ:0,angularZ:angularZ,interval:0});
            console.log("send: angularZ = 1");
         }else{
            postMessage({com:"sendVel",linearX:0,linearY:0,linearZ:0,angularZ:0,interval:0});
            console.log("send: angularZ = 0");
            origen = pose3d;
            giro++;
            step++;
         }
         break;
      case 4:
         console.log(Math.PI*0.95);
         console.log(pose3d.yaw);
         if (0<pose3d.yaw){
            angularZ = 0.1;
            postMessage({com:"sendVel",linearX:0,linearY:0,linearZ:0,angularZ:angularZ,interval:0});
            console.log("send: angularZ = 1");
         }else{
            postMessage({com:"sendVel",linearX:0,linearY:0,linearZ:0,angularZ:0,interval:0});
            console.log("send: angularZ = 0");
            origen = pose3d;
            giro++;
            step++;
         }
         break;
      case 6:
         console.log(-Math.PI/2);
         console.log(pose3d.yaw);
         if (-Math.PI/2>pose3d.yaw){
            angularZ = 0.1;
            postMessage({com:"sendVel",linearX:0,linearY:0,linearZ:0,angularZ:angularZ,interval:0});
            console.log("send: angularZ = 1");
         }else{
            postMessage({com:"sendVel",linearX:0,linearY:0,linearZ:0,angularZ:0,interval:0});
            console.log("send: angularZ = 0");
            origen = pose3d;
            giro++;
            step++;
         }
         break;
      case 8:
         postMessage({com:"land",interval:2});
         break;
      default:
         
   }
   //postMessage({linearX:linearX,linearY:linearY,linearZ:linearZ,angularZ:angularZ,interval:0});
}