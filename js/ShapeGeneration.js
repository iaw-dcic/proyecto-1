var elem = document.getElementById('draw-shapes');
var two = new Two({ type : Two.Types.canvas, height: 600, width : 800}).appendTo(elem);

var centerX = 0;
var centerY = 0;

var groupsQuantity = 7;
var groups; 

var animating = false;

function generate() {
    two.clear();
    startGroups();
    createLayer(250);
    createLayer(200);
    createLayer(150);
    createLayer(100);
    createLayer(50);
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

function toggleAnimation() {
    animating = !animating;
}

// Bind a function to scale and rotate the group
// to the animation loop.
two.bind('update', function(_frameCount) {
    var centered = false;
    if (animating && !centered) {
        groups[0].rotation += Math.PI * .002;
        groups[1].rotation -= Math.PI * .001;
        groups[2].rotation -= Math.PI * .002;
        groups[3].rotation += Math.PI * .001;
        groups[4].rotation -= Math.PI * .0005;
        groups[5].rotation += Math.PI * .0005;
        centered = groups[5].rotation % Math.PI == 0;
    }
}).play();  // Finally, start the animation loop


function createLayer(referenceRadius) {
    var min = 1;
    var max = 3;
    var shapesPerLayer = Math.floor(Math.random() * (max - min)) + min; 
    var newShape;
    for (let index = 0; index < shapesPerLayer; index++) {
        newShape = createShape(referenceRadius);
        assignToGroup(newShape);
        if (Math.random() > .5) {
            createTwinShape(newShape, .9); 
        }
        if (Math.random() > .5) {
            createTwinShape(newShape, 1.1); 
        }
    }
    if (Math.random() > .7) {
        createOrbitShapes(referenceRadius);
    }
}

function createShape(referenceRadius) {
    var shapeType = Math.floor(Math.random() * (4 - 1)) + 1; 
    var newShape;
    switch (shapeType) {
        case 1:
            newShape = createCircle(referenceRadius);
            break;
        case 2:
            newShape = createTriangle(referenceRadius);
            break;
        case 3:
            newShape = createHexagon(referenceRadius);
            break;
        default:
            break;
        }
        return newShape;
    }
            
function createCircle(referenceRadius) {
    var circle = two.makeCircle(centerX, centerY, referenceRadius);
    addStyle(circle);
    return circle;
}
            
function createTriangle(referenceRadius) {
    var triangle = two.makePolygon(centerX, centerY, referenceRadius, 3);
    if (Math.random() > .5) {
        triangle.rotation += Math.PI;
    }
    addStyle(triangle);
    return triangle;
}
            
function createHexagon(referenceRadius) {
    var hexagon = two.makePolygon(centerX, centerY, referenceRadius, 6);
    if (Math.random() > .5) {
        hexagon.rotation += Math.PI / 6;
    }
    addStyle(hexagon);
    return hexagon;
}

function createOrbitShapes(referenceRadius) {
    var numberOfShapes;
    numberOfShapes = (Math.random() > .5) ? 3 : 6;
    createCircles(numberOfShapes, referenceRadius);
    
}

function createCircles(n, radius) {
    var angle = 2 * Math.PI / n;
    var circles = new Array(n);
    for (var i = 0 ; i < n; i++) {     
        circles[i] = two.makeCircle(centerX + radius * Math.sin(angle * i), centerY + radius * Math.cos(angle * i), radius * .1);
        addStyle(circles[i]);
    }
    assignToGroup(circles);
}

function createTriangles(n, radius) {
    var angle = 2 * Math.PI / n;
    var triangles = new Array(n);
    for (var i = 0 ; i < n; i++) {     
        triangles[i] = two.makePolygon(centerX + radius * Math.sin(angle * i), centerY + radius * Math.cos(angle * i), radius * .1, 3);
        addStyle(triangles[i]);
    }
}

function createTwinShape(shape, scale) {
    var newShape = shape.clone();
    newShape.scale = shape.scale * scale;
    two.add(newShape);
    assignToGroup(newShape);
}

function addStyle(shape) {
    shape.fill = 'rgba(255, 255, 255, .1)';
    shape.stroke = 'rgba(255,255,255,1)';
    shape.linewidth = .5;
}

function assignToGroup(shape) {
    var group = Math.floor(Math.random() * groups.length); 
    groups[group].add(shape);
}