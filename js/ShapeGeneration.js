//Generation constants: 

var NUMBER_OF_LAYERS;
var LAYER_RADIUS = 30;
var MIN_SHAPES_PER_LAYER;
var MAX_SHAPES_PER_LAYER;
var ORBIT_SHAPE_PROBABILITY = .2;
var TWIN_SHAPE_PROBABILITY = .2;
var INSIDE_LINES_PROBABILITY = .1;
var ANIMATION_MULTIPLIER;
//-------------------------------------


//number of groups used for animation
var animationGroupsQuantity = 7;
//reference to animation groups
var animationGroups;
//used to avoid animation when groups haven't been created
var groupsGenerated = false;

//Center values used for shape generation
var centerX = 0;
var centerY = 0;

//Numbers used for generation, define types of shape used
var generationNumbers = [3,6];

//-------------------------------------

//Initialization code

//Set up of canvas and 'two' object
var elem = document.getElementById("twoWrapper");
var two = new Two({ type: Two.Types.canvas, fullscreen: true}).appendTo(
  elem
);
//we set the id of the created element for reference.
two.renderer.domElement.id = "canvas";

// Bind a function to scale and rotate the group
// to the animation loop.
two.bind("update", function (_frameCount) {
    if (ANIMATION_MULTIPLIER != 0 && groupsGenerated) {
      var animationSpeed = ANIMATION_MULTIPLIER * Math.PI;
      animationGroups[0].rotation += animationSpeed * 0.002;
      animationGroups[1].rotation -= animationSpeed * 0.001;
      animationGroups[2].rotation -= animationSpeed * 0.002;
      animationGroups[3].rotation += animationSpeed * 0.001;
      animationGroups[4].rotation -= animationSpeed * 0.0005;
      animationGroups[5].rotation += animationSpeed * 0.0005;
    }
  }).play(); // Finally, start the animation loop

//---------------------------------------

//FUNCTIONS:

function generate() {
  two.clear();
  startAnimationGroups();
  for (let i = NUMBER_OF_LAYERS; i > 0; i--) {
    createLayer(centerX, centerY, LAYER_RADIUS * i);
  }

  //all shapes are created around 0,0 so we center the entire groups
  for (let i = 0; i < animationGroups.length; i++) {
    animationGroups[i].translation.set(two.width / 2, two.height / 2);
  }
  groupsGenerated = true;
}

function startAnimationGroups() {
  animationGroups = new Array(animationGroupsQuantity);
  for (let i = 0; i < animationGroups.length; i++) {
    animationGroups[i] = two.makeGroup();
  }
}

function addGenerationNumber(number) {
  if (!generationNumbers.includes(number)) {
    generationNumbers.push(number);
  }
}

function removeGenerationNumber(number) {
  var index = generationNumbers.indexOf(number);
  if (index > -1) {
    generationNumbers.splice(index, 1);
  }
}

function createLayer(xValue, yValue, referenceRadius) {
  var shapesPerLayer = randomInRange(MIN_SHAPES_PER_LAYER, MAX_SHAPES_PER_LAYER);
  for (let i = 0; i < shapesPerLayer; i++) {
    createShape(xValue, yValue, referenceRadius);
  }
  if (Math.random() > 1 - ORBIT_SHAPE_PROBABILITY) {
    createOrbitShapes(referenceRadius);
  }
}

function createShape(xValue, yValue, referenceRadius) {
  if (generationNumbers.length > 0) {
    var shapeType = generationNumbers[randomInRange(0, generationNumbers.length)];
    switch (shapeType) {
      case 1:
        createCircle(xValue, yValue, referenceRadius);
        break;
      default:
        createPolygon(xValue, yValue, referenceRadius, shapeType);
        break;
    }
  }
}

function createCircle(xValue, yValue, referenceRadius) {
  var circleGroup = two.makeGroup();
  
  circleGroup.add(two.makeCircle(xValue, yValue, referenceRadius));

  //a chance to create a double or triple circle stroke 
  if (Math.random() > 1 - TWIN_SHAPE_PROBABILITY) {
    circleGroup.add(two.makeCircle(xValue, yValue, referenceRadius * 1.03));  
  }
  if (Math.random() > 1 - TWIN_SHAPE_PROBABILITY) {
    circleGroup.add(two.makeCircle(xValue, yValue, referenceRadius * .97));  
  }

  addStyle(circleGroup);
  assignToAnimationGroup(circleGroup);
}

function createPolygon(xValue, yValue, referenceRadius, sides) {
  var polygonGroup = two.makeGroup();

  //a chance to draw lines from the vertices of the polygon to its center
  if (Math.random() > 1 - INSIDE_LINES_PROBABILITY) {
    polygonGroup.add(createInsideLines(xValue, yValue, referenceRadius, sides));
  }

  //a chance to create a double or triple polygon stroke 
  if (Math.random() > 1 - TWIN_SHAPE_PROBABILITY) {
    polygonGroup.add(two.makePolygon(xValue, yValue, referenceRadius * 1.03, sides));
  }
  if (Math.random() > 1 - TWIN_SHAPE_PROBABILITY) {
    polygonGroup.add(two.makePolygon(xValue, yValue, referenceRadius * .97, sides));
  }

  //we create the shape itself
  polygonGroup.add(two.makePolygon(xValue, yValue, referenceRadius, sides));

  //half the times the entire shape is rotated for more variation
  if (Math.random() > 0.5) {
    polygonGroup.rotation += Math.PI / sides;
  }
  addStyle(polygonGroup);
  assignToAnimationGroup(polygonGroup);
}

function createInsideLines(xValue, yValue, referenceRadius, sides) {
  var linesGroup = two.makeGroup();

  //the angle between the lines
  var angle = (2 * Math.PI) / sides;
  //we need an offset angle due to the way the library creates shapes
  var offsetAngle = angle / 2;
  for (let i = 0; i < sides; i++) {
    //we use the parametric function of the circle to set the values around the circumference
    //so the first x,y pair is on the circunference, and the second is at the center of the figure
    var newLine = new Two.Line(
      xValue - referenceRadius * Math.sin(offsetAngle + angle * i),
      yValue + referenceRadius * Math.cos(offsetAngle + angle * i),
      xValue,
      yValue
    );
    two.add(newLine);
    linesGroup.add(newLine);
  }
  return linesGroup;
}

function createOrbitShapes(orbitRadius) {
  if (generationNumbers.length > 0) {
    var numberOfShapes = generationNumbers[randomInRange(0, generationNumbers.length)];
    createCircles(numberOfShapes, orbitRadius);
  }
}

function createCircles(n, radius) {
  //angle between the circles
  var angle = (2 * Math.PI) / n;
  var newCircle;
  var circlesGroup = two.makeGroup();
  for (let i = 0; i < n; i++) {
    //we use the parametric function of the circle to place them around the circumference
    newCircle = two.makeCircle(
      centerX + radius * Math.sin(angle * i),
      centerY + radius * Math.cos(angle * i),
      radius * 0.1
    );
    circlesGroup.add(newCircle);
  }
  addStyle(circlesGroup);
  assignToAnimationGroup(circlesGroup);
}

function addStyle(shape) {
  shape.fill = "rgba(255, 255, 255, .07)";
  shape.stroke = "rgba(0,0,0,1)";
  shape.linewidth = randomInRange(1,3) / 3;
}

function assignToAnimationGroup(shape) {
  var groupIndex = randomInRange(0, animationGroups.length);
  animationGroups[groupIndex].add(shape);
}

//Returns random int between two values. min inclusive. max exclusive
function randomInRange(minVal, maxVal) {
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}