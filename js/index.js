//width and height of the svg of the map
var width = 500,
  height = 900;

//Argentina's official map proyection is Gauss-Kruger but it's not supported by d3, so i'm using transverseMercator wich is the closest
//Argentina is between latitudes -55(lat1) and -22(lat2) and longitudes -74(long1) and -53(long2)
//lat -66 is at the center of the country so we need to use it for rotation and center
//the formula for center is y= (lat1 - lat2)/2 + lat2 and x = 66 - (long1 - long2)/2 + long2
//the formula for scale is (height * 56.5)/-(lat1 - lat2)
var projection = d3
  .geoTransverseMercator()
  .center([2.5, -38.5])
  .rotate([66, 0])
  .scale((height * 56.5) / 33)
  .translate([width / 2, height / 2]);

var svg = d3
  .select("#map-div-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

//Sets the projection for the map draw
var path = d3.geoPath().projection(projection);

svg.attr("d", path);

//loads the map cordinates from the json file
d3.json("/data/argentina_indec.json")
  .then(drawMap)
  .then(buildTable)
  .then(showMapDiv);

//topojson is the library im using to render the map
function drawMap(mapData) {
  svg
    .selectAll("path")
    .data(topojson.feature(mapData, mapData.objects.provincias).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "land");

  //draws bubbles of info over the recently drawn map
  //default bubbles type is infected
  drawBubbles("infected");
}

function drawBubbles(bubblesType) {
  //bubbles position
  var bubbles = [
    { x: 350, y: 350, id: 0 },
    { x: 308, y: 403, id: 1 },
    { x: 315, y: 135, id: 2 },
    { x: 235, y: 280, id: 3 },
    { x: 150, y: 507, id: 4 },
    { x: 300, y: 240, id: 5 },
    { x: 160, y: 880, id: 6 },
    { x: 101, y: 455, id: 7 },
    { x: 130, y: 345, id: 8 },
    { x: 380, y: 195, id: 9 },
    { x: 158, y: 209, id: 10 },
    { x: 110, y: 725, id: 11 },
    { x: 197, y: 140, id: 12 },
    { x: 340, y: 285, id: 13 },
    { x: 460, y: 150, id: 14 },
    { x: 245, y: 165, id: 15 },
    { x: 180, y: 310, id: 16 },
    { x: 180, y: 27, id: 17 },
    { x: 190, y: 415, id: 18 },
    { x: 210, y: 95, id: 19 },
    { x: 130, y: 600, id: 20 },
    { x: 120, y: 250, id: 21 },
    { x: 330, y: 84, id: 22 },
    { x: 149, y: 140, id: 23 }
  ];

  //tooltip box
  var tooltip = d3.select(".tooltip");

  //shows the tooltip box
  var mouseover = function(b) {
    tooltip.attr("class", "tooltip visible");
  };

  //sets the tooltip box text and position
  //tooltip position depends on mouse cursor position
  var mousemove = function(b) {
    tooltip.html(
      covidAffectedTotals[b.id]["name"] +
        "<br> cantidad: " +
        covidAffectedTotals[b.id][bubblesType]
    );

    tooltip
      .style("top", event.pageY + "px")
      .style("left", event.pageX + 15 + "px");
  };

  //hides the tooltip box
  var mouseleave = function(b) {
    tooltip.attr("class", "tooltip");
  };

  //sets the scale for the buubles depending on the value and maxvalue
  function bubbleSize(value, maxValue) {
    var size = 0;
    if (value > 0) {
      //if value < 0 it doesn't draw the bubble
      var scale = d3
        .scaleLinear()
        .domain([1, maxValue]) // data range
        .range([5, 60]); // bubble range
      size = scale(value);
    }
    return size;
  }

  //gets the max value of an specific type from the covidAffectedTotals
  function maxValue(bubblesType) {
    var filteredTotals = covidAffectedTotals.map(a => a[bubblesType]);
    return Math.max.apply(Math, filteredTotals);
  }

  //removes previously drawn bubbles from the map
  d3.selectAll(".bubbles").remove();

  //draws the new bubbles
  svg
    .selectAll("bubbles")
    .data(bubbles) //contains position and id data
    .enter()
    .append("circle")
    .attr("cx", function(b) {
      return b.x;
    })
    .attr("cy", function(b) {
      return b.y;
    })
    .attr("r", function(b) {
      return bubbleSize(
        covidAffectedTotals[b.id][bubblesType],
        maxValue(bubblesType)
      );
    })
    .attr("class", "bubbles bubbles-" + bubblesType)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
}

var covidAffectedTotals = [
  { name: "CABA", infected: 2464, recovered: 640, dead: 106 },
  { name: "Buenos Aires", infected: 2332, recovered: 497, dead: 133 },
  { name: "Chaco", infected: 504, recovered: 75, dead: 23 },
  { name: "Córdoba", infected: 361, recovered: 70, dead: 24 },
  { name: "Río Negro", infected: 294, recovered: 130, dead: 11 },
  { name: "Santa Fe", infected: 244, recovered: 164, dead: 3 },
  { name: "Tierra del Fuego", infected: 148, recovered: 77, dead: 0 },
  { name: "Neuquén", infected: 113, recovered: 39, dead: 5 },
  { name: "Mendoza", infected: 88, recovered: 30, dead: 9 },
  { name: "Corrientes", infected: 76, recovered: 33, dead: 0 },
  { name: "La Rioja", infected: 60, recovered: 2, dead: 7 },
  { name: "Santa Cruz", infected: 49, recovered: 30, dead: 0 },
  { name: "Tucumán", infected: 42, recovered: 20, dead: 4 },
  { name: "Entre Ríos", infected: 29, recovered: 17, dead: 0 },
  { name: "Misiones", infected: 25, recovered: 6, dead: 1 },
  { name: "Santiago del Estero", infected: 16, recovered: 11, dead: 0 },
  { name: "San Luis", infected: 11, recovered: 7, dead: 0 },
  { name: "Jujuy", infected: 5, recovered: 4, dead: 0 },
  { name: "La Pampa", infected: 5, recovered: 5, dead: 0 },
  { name: "Salta", infected: 5, recovered: 3, dead: 0 },
  { name: "Chubut", infected: 4, recovered: 0, dead: 0 },
  { name: "San Juan", infected: 3, recovered: 2, dead: 0 },
  { name: "Formosa", infected: 0, recovered: 0, dead: 0 },
  { name: "Catamarca", infected: 0, recovered: 0, dead: 0 }
];

//draws infected type bubbles over the map
d3.select("#infected-button").on("click", function() {
  drawBubbles("infected");
});

//draws dead type bubbles over the map
d3.select("#dead-button").on("click", function() {
  drawBubbles("dead");
});

//draws recpvered type bubbles over the map
d3.select("#recovered-button").on("click", function() {
  drawBubbles("recovered");
});

function showMapDiv() {
  d3.select("#map-div-container").attr("class", null);
}

function buildTable() {
  const tableContainer = d3.select("#table-div-container");
  const table = tableContainer.append("table");
  const thead = table.append("thead");
  const headRow = thead.append("tr");
  headRow.attr("class", "titles");
  const titles = ["Provincia", "Infectados", "Recuperados", "Fallecidos"];
  titles.forEach(function(t, i) {
    var tdata = headRow.append("td").text(t);
    if (i > 0) tdata.attr("class", "vertical");
  });
  const tbody = table.append("tbody");
  covidAffectedTotals.forEach(function(data, i) {
    var row = tbody.append("tr");
    row.attr("class", "datarow");
    row.append("td").text(data.name);
    row
      .append("td")
      .text(data.infected)
      .attr("class", "infected");
    row
      .append("td")
      .text(data.recovered)
      .attr("class", "recovered");
    row
      .append("td")
      .text(data.dead)
      .attr("class", "dead");
  });
}

const burger = d3.select(".burger i");
const nav = d3.select(".nav");

function toggleNav() {
  burger.classList.toggle("fa-bars");
  burger.classList.toggle("fa-times");
  nav.classList.toggle("nav-active");
}

burger.on("click", function() {
  toggleNav();
});
