var elem = document.getElementById('draw-shapes');
var two = new Two({ fullscreen : true}).appendTo(elem);

var centerX = two.width / 2;
var centerY = two.height / 2;

createLayer(30);
createLayer(50);
createLayer(80);
createLayer(130);
createLayer(210);

function createCircles(n, radius) {
    var angle = 2 * Math.PI / n;
    var circles = new Array(n);
    for (var i = 0 ; i < n; i++) {     
        circles[i] = two.makeCircle(centerX + radius * Math.sin(angle * i), centerY + radius * Math.cos(angle * i), radius * .1);
        addStyle(circles[i]);
    }
}

function createTriangles(n, radius) {
    var angle = 2 * Math.PI / n;
    var triangles = new Array(n);
    for (var i = 0 ; i < n; i++) {     
        triangles[i] = two.makePolygon(centerX + radius * Math.sin(angle * i), centerY + radius * Math.cos(angle * i), radius * .5, 3);
        addStyle(triangles[i]);
    }
}

// Bind a function to scale and rotate the group
// to the animation loop.
two.bind('update', function(_frameCount) {
}).play();  // Finally, start the animation loop


function createLayer(referenceRadius) {
    var min = 1;
    var max = 3;
    var shapesPerLayer = Math.floor(Math.random() * (max - min)) + min; 
    var newShape;
    for (let index = 0; index < shapesPerLayer; index++) {
        newShape = createShape(referenceRadius);
        if (Math.random() > .7) {
            createTwinShape(newShape); 
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

function createTwinShape(shape) {
    var newShape = shape.clone();
    newShape.scale = shape.scale * 1.1;
    two.add(newShape);
}

function addStyle(shape) {
    shape.fill = 'rgba(255, 255, 255, 0.2)';
    shape.stroke = 'gainsboro';
    shape.linewidth = 2;
}
