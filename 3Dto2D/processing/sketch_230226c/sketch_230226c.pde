PShape car;

void setup() {
  size(600, 600, P3D);
  frameRate(1);
  car = loadShape("audi.obj");
}



void preload() {
  car = loadShape("audi.obj");
  //car = loadModel('./Trains/electrictrain.obj', true);
}


void drawSphere(float r) {
  push();
  stroke(0); // set the stroke color to black
  strokeWeight(2);
  noFill(); // disable filling
  sphereDetail(20, 20);
  sphere(r);
  pop();
}

void setUpPhong() {
  // Setting the vector values 
    // or the direction of light
    int dx = 300;
    int dy = 200;
    int dz = -600;
    PVector v = new PVector(dx, dy, dz);

    // Creating the ambient light 
    ambientLight(255, 255,255);
    
    // Creating the directional light
    // by using the given vector
    directionalLight(255, 255, 255, dx, dy, dz);
    
    shininess(255);
    lightSpecular(255, 255, 255);
    specular(20);
    
    // Creating the point lights at the
    // given points from the given directions
    pointLight(255, 255, 255, 0, -50, 0);
    pointLight(255, 255, 255, 200,200,30);
    

    
    // Setting the background
    background(255);

    noStroke();
}


void draw() {
  setUpPhong();
  translate(width/2, height/2);
  drawSphere(200);
  
  rotateX(PI);
  scale(0.06);
  shape(car, 0, 0);
  
}
