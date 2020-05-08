var elem = document.getElementById("draw-shapes");
var two = new Two({ type: Two.Types.canvas, height: 600, width: 800 }).appendTo(
  elem
);

var centerX = 0;
var centerY = 0;

var groupsQuantity = 7;
var groups;

var NUMBER_OF_LAYERS;
var MAX_SHAPES_PER_LAYER;
var MIN_SHAPES_PER_LAYER;
var ANIMATION_SPEED;

function generate() {
  two.clear();
  startGroups();
  for (let i = NUMBER_OF_LAYERS; i > 0; i--) {
    createLayer(centerX, centerY, 30 * i);
  }
  for (let i = 0; i < groups.length; i++) {
    groups[i].translation.set(two.width / 2, two.height / 2);
  }
}

function startGroups() {
  groups = new Array(groupsQuantity);
  for (let i = 0; i < groups.length; i++) {
    groups[i] = two.makeGroup();
  }
}

// Bind a function to scale and rotate the group
// to the animation loop.
two
  .bind("update", function (_frameCount) {
    if (ANIMATION_SPEED != 0) {
      var animationMultiplier = ANIMATION_SPEED * Math.PI;
      groups[0].rotation += animationMultiplier * 0.002;
      groups[1].rotation -= animationMultiplier * 0.001;
      groups[2].rotation -= animationMultiplier * 0.002;
      groups[3].rotation += animationMultiplier * 0.001;
      groups[4].rotation -= animationMultiplier * 0.0005;
      groups[5].rotation += animationMultiplier * 0.0005;
    }
  })
  .play(); // Finally, start the animation loop

function createLayer(xValue, yValue, referenceRadius) {
  var shapesPerLayer =
    Math.floor(
      Math.random() * (+MAX_SHAPES_PER_LAYER + 1 - +MIN_SHAPES_PER_LAYER)
    ) + +MIN_SHAPES_PER_LAYER;
  var newShape;
  for (let i = 0; i < shapesPerLayer; i++) {
    newShape = createShape(xValue, yValue, referenceRadius);
    if (Math.random() > 0.5) {
      createTwinShape(newShape, 0.97);
    }
    if (Math.random() > 0.5) {
      createTwinShape(newShape, 1.03);
    }
  }
  if (Math.random() > 0.8) {
    createOrbitShapes(referenceRadius);
  }
}

function createShape(xValue, yValue, referenceRadius) {
  var shapeType = Math.floor(Math.random() * (4 - 1)) + 1;
  var newShape;
  switch (shapeType) {
    case 1:
      newShape = createCircle(xValue, yValue, referenceRadius);
      break;
    case 2:
      newShape = createPolygon(xValue, yValue, referenceRadius, 3);
      break;
    case 3:
      newShape = createPolygon(xValue, yValue, referenceRadius, 6);
      break;
    default:
      break;
  }
  return newShape;
}

function createCircle(xValue, yValue, referenceRadius) {
  var circle = two.makeCircle(xValue, yValue, referenceRadius);
  addStyle(circle);
  assignToGroup(circle);
  return circle;
}

function createPolygon(xValue, yValue, referenceRadius, sides) {
  var polygonGroup = two.makeGroup();
  if (Math.random() > 0.9) {
    var angle = (2 * Math.PI) / sides;
    var offsetAngle = Math.PI / sides;
    for (let i = 0; i < sides; i++) {
      var newLine = new Two.Line(
        centerX - referenceRadius * Math.sin(offsetAngle + angle * i),
        centerY + referenceRadius * Math.cos(offsetAngle + angle * i),
        centerX,
        centerY
      );
      two.add(newLine);
      polygonGroup.add(newLine);
    }
  }
  var polygon = two.makePolygon(xValue, yValue, referenceRadius, sides);
  polygonGroup.add(polygon);
  if (Math.random() > 0.5) {
    polygonGroup.rotation += Math.PI / sides;
  }
  addStyle(polygonGroup);
  assignToGroup(polygonGroup);
  return polygon;
}

function createOrbitShapes(orbitRadius) {
  var numberOfShapes;
  numberOfShapes = Math.random() > 0.5 ? 3 : 6;
  createCircles(numberOfShapes, orbitRadius);
}

function createCircles(n, radius) {
  var angle = (2 * Math.PI) / n;
  var circles = new Array(n);
  var circlesGroup = two.makeGroup();
  for (let i = 0; i < n; i++) {
    circles[i] = two.makeCircle(
      centerX + radius * Math.sin(angle * i),
      centerY + radius * Math.cos(angle * i),
      radius * 0.1
    );
    circlesGroup.add(circles[i]);
  }
  addStyle(circlesGroup);
  assignToGroup(circlesGroup);
}

function createTwinShape(shape, scale) {
  var newShape = shape.clone();
  newShape.scale = shape.scale * scale;
  two.add(newShape);
  assignToGroup(newShape);
  return newShape;
}

function addStyle(shape) {
  shape.fill = "rgba(255, 255, 255, .07)";
  shape.stroke = "rgba(0,0,0,1)";
  shape.linewidth = (Math.floor(Math.random() * 3) + 1) / 3;
}

function assignToGroup(shape) {
  var groupIndex = Math.floor(Math.random() * groups.length);
  groups[groupIndex].add(shape);
}
