var generateButton = document.getElementById("generate-button");
var minShapesPerLayerInput = document.getElementById("minShapesPerLayerInput");
var maxShapesPerLayerInput = document.getElementById("maxShapesPerLayerInput");
var layersNumber = document.getElementById("layersNumber");
var layersSlider = document.getElementById("layersSlider");
var animationSpeedSlider = document.getElementById("animationSpeedSlider");
var animationSpeedNumber = document.getElementById("animationSpeedNumber");
var exportButton = document.getElementById("exportButton");
var lightThemeButton = document.getElementById("lightThemeButton");
var darkThemeButton = document.getElementById("darkThemeButton");

var lightTheme = 'css/lightTheme.css';
var darkTheme = 'css/darkTheme.css';

setListeners();
loadData();
setAnimationSpeed(0);

function setListeners() {
  generateButton.onclick = generateShapes;
  exportButton.onclick = exportCanvas;
  layersSlider.oninput = setNumberOfLayers;
  minShapesPerLayerInput.oninput = setShapesPerLayer;
  maxShapesPerLayerInput.oninput = setShapesPerLayer;
  animationSpeedSlider.oninput = setAnimationSpeed;
  lightThemeButton.onclick = function() { changeTheme(lightTheme); }
  darkThemeButton.onclick = function() { changeTheme(darkTheme); }
  var checkboxes = document.querySelectorAll('[id^=generation-checkbox]');
  for (let i in checkboxes) {
    checkboxes[i].onchange = generationCheckboxChange;
  }
}

function generateShapes() {
  generate();
}

function changeTheme(theme) {
  document.getElementById("theme").href = theme;
  localStorage.setItem("theme", theme);
}

function setNumberOfLayers() {
  var value = layersSlider.value;
  layersNumber.textContent = value;
  NUMBER_OF_LAYERS = value;
  localStorage.setItem("numberOfLayers", value);
}

function setAnimationSpeed() {
  var value = animationSpeedSlider.value;
  animationSpeedNumber.textContent = value / 10;
  ANIMATION_MULTIPLIER = value / 10;
}

function setShapesPerLayer() {
  MIN_SHAPES_PER_LAYER = +minShapesPerLayerInput.value;
  MAX_SHAPES_PER_LAYER = +maxShapesPerLayerInput.value;
  localStorage.setItem("minShapesPerLayer", minShapesPerLayerInput.value);
  localStorage.setItem("maxShapesPerLayer", maxShapesPerLayerInput.value);
}

function generationCheckboxChange() {
  if (this.checked) {
    addGenerationNumber(+this.value);
  } else {
    removeGenerationNumber(+this.value);
  }
}

function loadData() {
  if (localStorage.getItem("minShapesPerLayer")) {
    MIN_SHAPES_PER_LAYER = +localStorage.getItem("minShapesPerLayer");
    minShapesPerLayerInput.value = MIN_SHAPES_PER_LAYER;
  } else {
    MIN_SHAPES_PER_LAYER = 1;
    minShapesPerLayerInput.value = MIN_SHAPES_PER_LAYER;
  }
  if (localStorage.getItem("maxShapesPerLayer")) {
    MAX_SHAPES_PER_LAYER = +localStorage.getItem("maxShapesPerLayer");
    maxShapesPerLayerInput.value = MAX_SHAPES_PER_LAYER;
  } else {
    MAX_SHAPES_PER_LAYER = 2;
    maxShapesPerLayerInput.value = MAX_SHAPES_PER_LAYER;
  }
  if (localStorage.getItem("numberOfLayers")) {
    NUMBER_OF_LAYERS = localStorage.getItem("numberOfLayers");
    layersNumber.textContent = NUMBER_OF_LAYERS;
    layersSlider.value = NUMBER_OF_LAYERS;
  } else {
    NUMBER_OF_LAYERS = 2;
    layersNumber.textContent = NUMBER_OF_LAYERS;
    layersSlider.value = NUMBER_OF_LAYERS;
  }
  if (localStorage.getItem("theme")) {
    document.getElementById("theme").href = localStorage.getItem("theme");
  } else {
    document.getElementById("theme").href = lightTheme;
  }
}

function exportCanvas() {
  var dt = document.getElementById("canvas").toDataURL();
  exportButton.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}