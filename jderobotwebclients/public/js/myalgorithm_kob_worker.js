/* Data Recived
 * - laser:
 *       + distanceData : Array of distances
 *       + numLaser: numer of lasers
 * - pose3d:
 *       + x,y,z: coords
 *       + q1,q2,q3,q4 : quaternion
 *       + yaw, pitch, roll: orientation
 * - caml, camr:
 *       + data: Array of Image data
 *       + width, height: width y height of the image, in pixels
 *
 *********************************
 * Data Response
 * - v,w: velocities 
 * - interval: if the action takes more than time reception sensor (100ms). Possible values:
 *   + 0 : do nothing
 *   + 1 : start interval in main thread
 *   + 2 : stop interval in main thread
 */
function reanudar (){
   postMessage({v:30,w:0,interval:1});
}
function giro(){
   var t = Math.floor((Math.random() * 10) + 1);
   postMessage({v:0,w:-10,interval:0});
   setTimeout(reanudar,t*100);
}
function atras(){
   postMessage({v:-20,w:0,interval:2});
   setTimeout(giro,500);
}

onmessage = function(e) {
    
   var laser  = e.data.laser;
   var pose3d = e.data.pose3d;
   var caml = e.data.caml;
   var camr = e.data.camr;
   
   var v = 0;
   var w = 0;
   
   if (laser.distanceData[90]<1000){
      atras();
   }else{
      postMessage({v:30,w:0,interval:0});
   };
   
          
   
   //postMessage({v:v,w:w,interval:0});
}