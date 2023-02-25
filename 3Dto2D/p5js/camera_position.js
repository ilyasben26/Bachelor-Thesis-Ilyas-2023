let cam;
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
    cam = createCamera();
    cam.move(0,0,-(height/2) / (tan(PI/6)));
    // the equation
    let r = 300;
    let alpha = radians(-30); // constant
    let theta = radians(30); // will change
    //cam.move(0, r * sin(alpha) , r * cos(alpha));
    cam.move(r * cos(alpha) * sin(theta), 
             r * sin(alpha), 
             r * cos(alpha) * sin(theta));
    cam.lookAt(0, 0, 0);
}


function drawSphere(r) {
    push();
    stroke(0); // set the stroke color to black
    strokeWeight(2);
    noFill(); // disable filling
    sphere(r,20,20);
    pop();
}

function drawAxis() {
    push();
    
    strokeWeight(5); // set the stroke weight to 5 pixels
    stroke(255, 0, 0); // set the stroke color to red
    line(0, -200, 0, 0, 200, 0); // draw a line from (0,-100) to (0,+100) on y axis

    stroke(0, 255, 0); // set the stroke color to red
    line(-200, 0, 0, 200, 0, 0);

    stroke(0, 0, 255); // set the stroke color to red
    line(0, 0, 200, 0, 0, -200);
    pop();
}

function setUpPhong() {
    // Setting the vector values 
    // or the direction of light
    let dx = 300;
    let dy = 200;
    let dz = -600;
    let v = createVector(dx, dy, dz);

    // Creating the ambient light 
    ambientLight(255, 255,255);
    
    // Creating the directional light
    // by using the given vector
    directionalLight(255, 255, 255, v);
    
    shininess(255);
    specularColor(255);
    specularMaterial(20);
    
    // Creating the point lights at the
    // given points from the given directions
    pointLight(255, 255, 255, 0, -50, 0);
    pointLight(255, 255, 255, 200,200,30);
    

    
    // Setting the background
    background(255);

    noStroke();
}

function generatePoints(r) {
    
    a = 0
    for(let i = 0; i < 12; i++) {
        push();
        stroke(255, 0,0); 
        strokeWeight(30); 
        rotateY(radians(a));
        rotateZ(radians(-30));
        point(-r, 0, 0); 
        a += 30
        pop();
    }

}

function newGeneratePoints(r) {
    
    a = 0
    for(let i = 0; i < 12; i++) {
        push();
        stroke(255, 0,0); 
        strokeWeight(30); 
        rotateY(radians(a));
        rotateZ(radians(-30));
        point(-r, 0, 0); 
        a += 30
        pop();
    }

}

    
function draw() {

    
    setUpPhong();

    
    
  
        
    
    rotateX(3.14);
    //rotateY(angle);
    //scale(sf);
   
    
    // Restore the previous transformation state
   
    
  
    //translate();
    if (mouseIsPressed) {
        x -= pmouseX - mouseX;
        y -= pmouseY - mouseY;
    }
    
  
    model(car);

  
    //drawAxis();
    //drawSphere(200);

  
    generatePoints(200);
    angle += 0.01;

    
    
    
    

}


window.addEventListener("wheel", function(e) {
    if (e.deltaY > 0)
      sf *= 1.05;
    else
      sf *= 0.95;
  });