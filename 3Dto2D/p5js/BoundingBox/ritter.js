// Compute bounding sphere for a set of points using Jack Ritter's algorithm
// https://en.wikipedia.org/wiki/Bounding_sphere#Ritter's_bounding_sphere
// Ritter's algorithm is very simple and efficient, but gives only a coarse result
// which is usually 5% to 20% larger than the optimum.

// A point is an array of three numbers [x, y, z]
// A sphere is an object with two properties: center and radius

function ritterBoundingSphere(points) {
    // Find two points that are farthest apart
    let p1 = points[0];
    let p2 = findFarthestPoint(points, p1);
    let p3 = findFarthestPoint(points, p2);
  
    // Initialize the sphere with the center and radius of the line segment between p2 and p3
    let sphere = {
      center: [(p2[0] + p3[0]) / 2, (p2[1] + p3[1]) / 2, (p2[2] + p3[2]) / 2],
      radius: distance(p2, p3) / 2,
    };
  
    // Iterate over the remaining points and update the sphere if necessary
    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      // If the point is inside the sphere, do nothing
      if (distance(point, sphere.center) <= sphere.radius) continue;
      // Otherwise, grow the sphere to include the point
      else {
        let newRadius = (sphere.radius + distance(point, sphere.center)) / 2;
        let ratio = (newRadius - sphere.radius) / newRadius;
        sphere.center[0] += (point[0] - sphere.center[0]) * ratio;
        sphere.center[1] += (point[1] - sphere.center[1]) * ratio;
        sphere.center[2] += (point[2] - sphere.center[2]) * ratio;
        sphere.radius = newRadius;
      }
    }
  
    return sphere;
  }
  
  // Helper function to find the farthest point from a given point in a set of points
  function findFarthestPoint(points, point) {
    let maxDistance = -Infinity;
    let farthestPoint = null;
    
     for (let i = 0; i < points.length; i++) {
       let distanceSquared = distanceSquared(points[i], point);
       if (distanceSquared > maxDistance) {
         maxDistance = distanceSquared;
         farthestPoint = points[i];
       }
     }
  
     return farthestPoint;
  }
  
  // Helper function to calculate the Euclidean distance between two points
  function distance(p1, p2) {
     return Math.sqrt(distanceSquared(p1,p2));
  }
  
  // Helper function to calculate the squared Euclidean distance between two points
  function distanceSquared(p1,p2){
     return Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2)+Math.pow(p1[2]-p2[2],2);
  }




// Parse a .obj file and return an object with vertices, normals and faces arrays
// Adapted from https://stackoverflow.com/questions/5904230/parsing-obj-3d-graphics-file-with-javascript

function parseObjFile(objText) {
    // Create an empty object to store the data
    let obj = {
      vertices: [],
      normals: [],
      faces: [],
    };
  
    // Split the text by lines
    let lines = objText.split("\n");
  
    // Loop through each line
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
  
      // If the line starts with "v ", it is a vertex definition
      if (line.startsWith("v ")) {
        // Use a regular expression to match the numbers after "v "
        let vertexMatch = line.match(/v (-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)/);
        if (vertexMatch) {
          // Push the x, y and z coordinates to the vertices array
          obj.vertices.push([vertexMatch[1], vertexMatch[3], vertexMatch[5]]);
        }
      }
  
      // If the line starts with "vn ", it is a normal definition
      else if (line.startsWith("vn ")) {
        // Use a regular expression to match the numbers after "vn "
        let normalMatch = line.match(/vn (-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)/);
        if (normalMatch) {
          // Push the x, y and z components to the normals array
          obj.normals.push([normalMatch[1], normalMatch[3], normalMatch[5]]);
        }
      }
  
      // If the line starts with "f ", it is a face definition
      else if (line.startsWith("f ")) {
        // Use a regular expression to match the indices after "f "
        let faceMatch = line.match(/f (\d+)\/(\d+)\/(\d+)\s+(\d+)\/(\d+)\/(\d+)\s+(\d+)\/(\d+)\/(\d+)/);
        if (faceMatch) {
          // Push an array of three vertices to the faces array
          // Each vertex is an array of three indices: [positionIndex, textureIndex, normalIndex]
          obj.faces.push([
            [faceMatch[1], faceMatch[2], faceMatch[3]],
            [faceMatch[4], faceMatch[5], faceMatch[6]],
            [faceMatch[7], faceMatch[8], faceMatch[9]],
          ]);
        }
      }
    }
  
    return obj;
  }


const fs = require('fs');

// Read and parse a .obj file
let objText = fs.readFileSync("../car.obj", "utf8");
let obj = parseObjFile(objText);

// Get an array of points from the vertices array
let points = obj.vertices.map((v) => ({ x: v[0], y: v[1], z: v[2] }));

// Compute the bounding sphere using Ritter's algorithm
let sphere = boundingSphere(points);

// Print the center and radius of the bounding sphere
console.log(sphere.center); // { x: ..., y: ..., z: ... }
console.log(sphere.radius); // ...