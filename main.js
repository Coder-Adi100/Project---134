video = "";
objects = [];
status1 = "";
function preload() {
  sound = loadSound("emergency-alarm-with-reverb-29431.mp3");

}
function setup() {
    canvas = createCanvas(400 , 250);
    canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector("cocossd" , modelLoaded );
  document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function draw() {
    image(video , 0 , 0 , 400 , 250);
    if (status1 != ""){
        objectDetector.detect(video , gotResult);
    for (i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Objects Detected";

        if(objects[i].label == "person"){
            document.getElementById("number_of_objects").innerHTML = "Baby Detected";
            sound.stop();
        }
        else {
            document.getElementById("number_of_objects").innerHTML = "Baby not Detected";
            sound.play();
        }
        if(objects.length == 0){
            document.getElementById("number_of_objects").innerHTML = "Baby not detected";
            sound.play();
        }
    }
    }
}
function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
}
function gotResult (error , results) {
       if (error) {
        console.log(error);
       }
       console.log(results);
       objects = results;
}
