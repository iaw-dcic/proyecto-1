var generateButton = document.getElementById("generate-button");
var animateButton = document.getElementById("animate-button");
var minShapesPerLayerInput = document.getElementById("minShapesPerLayerInput");
var maxShapesPerLayerInput = document.getElementById("maxShapesPerLayerInput");
var layersNumber = document.getElementById("layersNumber");

generateButton.onclick = generateShapes;
animateButton.onclick = animateShapes;
setShapesPerLayer();
setNumberOfLayers(1);

function generateShapes() {
    generate();
}

function animateShapes() {
    toggleAnimation();
}

function changeTheme(theme) {
    document.getElementById('theme').href = theme;
}

function setNumberOfLayers(value) {
    layersNumber.textContent = value;
    NUMBER_OF_LAYERS = value;
}

function setShapesPerLayer() {
    MIN_SHAPES_PER_LAYER = +minShapesPerLayerInput.value;
    MAX_SHAPES_PER_LAYER = +maxShapesPerLayerInput.value;
}
