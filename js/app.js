var generateButton = document.getElementById("generate-button");
var animateButton = document.getElementById("animate-button");

generateButton.onclick = generateShapes;
animateButton.onclick = animateShapes;

function generateShapes() {
    generate();
}

function animateShapes() {
    toggleAnimation();
}

