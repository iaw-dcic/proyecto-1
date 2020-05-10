var generateButton = document.getElementById("generate-button");
var minShapesPerLayerInput = document.getElementById("minShapesPerLayerInput");
var maxShapesPerLayerInput = document.getElementById("maxShapesPerLayerInput");
var layersNumber = document.getElementById("layersNumber");
var layersSlider = document.getElementById("layersSlider");
var animationSpeedNumber = document.getElementById("animationSpeedNumber");
var exportButton = document.getElementById("exportButton");

generateButton.onclick = generateShapes;
exportButton.onclick = exportCanvas;
loadData();
setAnimationSpeed(0);

function generateShapes() {
  generate();
}

function changeTheme(theme) {
  document.getElementById("theme").href = theme;
  localStorage.setItem("theme", theme);
}

function setNumberOfLayers(value) {
  layersNumber.textContent = value;
  NUMBER_OF_LAYERS = value;
  localStorage.setItem("numberOfLayers", value);
}

function setAnimationSpeed(value) {
  animationSpeedNumber.textContent = value / 10;
  ANIMATION_SPEED = value / 10;
}

function setShapesPerLayer() {
  MIN_SHAPES_PER_LAYER = +minShapesPerLayerInput.value;
  MAX_SHAPES_PER_LAYER = +maxShapesPerLayerInput.value;
  localStorage.setItem("minShapesPerLayer", minShapesPerLayerInput.value);
  localStorage.setItem("maxShapesPerLayer", maxShapesPerLayerInput.value);
}

function loadData() {
  MIN_SHAPES_PER_LAYER = +localStorage.getItem("minShapesPerLayer");
  minShapesPerLayerInput.value = MIN_SHAPES_PER_LAYER;
  MAX_SHAPES_PER_LAYER = +localStorage.getItem("maxShapesPerLayer");
  maxShapesPerLayerInput.value = MAX_SHAPES_PER_LAYER;
  NUMBER_OF_LAYERS = localStorage.getItem("numberOfLayers");
  layersNumber.textContent = NUMBER_OF_LAYERS;
  layersSlider.value = NUMBER_OF_LAYERS;

  document.getElementById("theme").href = localStorage.getItem("theme");
}

function exportCanvas() {
  var dt = document.getElementById("canvas").toDataURL();
  exportButton.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}