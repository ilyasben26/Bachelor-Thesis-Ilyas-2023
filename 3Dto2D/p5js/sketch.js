let car;
let car_texture;
let sf = 3; // scaleFactor
let x = 0; // pan X
let y = 0; // pan Y
let angle = 0;
let mx, my; // mouse coords;

function preload() {
  car = loadModel('audi.obj', true);
  //car = loadModel('./Trains/electrictrain.obj', true);
  
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  
}

function draw() {
  mx = mouseX;
  my = mouseY;

  background(255);
  noStroke();

  camera(0,0, (height/2) / (tan(PI/6)), 0,0,0, 0,1,0);

  // light
  //ambientLight(255);
  //pointLight(255,255,255,0,-200,200);
  directionalLight(255,255,255, 0, 1,-1);
  
  // material
  //normalMaterial();
  //ambientMaterial(50);
  specularMaterial(20);
  
  rotateX(3.14);
  rotateY(angle);
  scale(sf);

  //translate();
  if (mouseIsPressed) {
    x -= pmouseX - mouseX;
    y -= pmouseY - mouseY;
  }
  
  angle += 0.01;
  model(car);
}

window.addEventListener("wheel", function(e) {
    if (e.deltaY > 0)
      sf *= 1.05;
    else
      sf *= 0.95;
  });