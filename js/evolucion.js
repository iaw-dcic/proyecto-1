const chartContainer = d3.select("#timelapse-chart-div-container");

var timeLapseChart;

//loads the timelapse chart data from data.csv
d3.csv("/data/data.csv", readCsv)
  .then(parseData)
  .then(addTimeLapseChartSvg)
  .then(drawchart)
  .then(generateFilterInputs)
  .then(showFilterInputs);

var data = [];
function readCsv(d) {
  data.push(d);
}

var columnNames = [
  "BUENOS AIRES",
  "CABA",
  "CHACO",
  "CÓRDOBA",
  "RÍO NEGRO",
  "SANTA FE",
  "TIERRA DEL FUEGO",
  "NEUQUÉN",
  "MENDOZA",
  "LA RIOJA",
  "CORRIENTES",
  "SANTA CRUZ",
  "TUCUMÁN",
  "ENTRE RÍOS",
  "MISIONES",
  "SANTIAGO DEL ESTERO",
  "SAN LUIS",
  "JUJUY",
  "LA PAMPA",
  "CHUBUT",
  "SALTA",
  "SAN JUAN",
  "CATAMARCA",
  "FORMOSA"
];

//generates province's checkbox inputs and date inputs for filtering the timelapse chart
function generateFilterInputs() {
  const inputsContainer = d3.select("#provinces-picker-div-container");
  columnNames.forEach(function(n, i) {
    inputsContainer
      .append("input")
      .attr("type", "checkbox")
      .attr("id", "province" + i)
      .attr("name", "province" + i)
      .attr("value", n)
      .attr("class", "provinceInput")
      .property("checked", true);
    inputsContainer
      .append("label")
      .attr("for", "province" + i)
      .attr("class", "provinceInputLabel")
      .text(n);
    inputsContainer.append("br");
  });

  $(function() {
    var defaults = {
      closeText: "Cerrar",
      prevText: "<Ant",
      nextText: "Sig>",
      currentText: "Hoy",
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      monthNamesShort: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ],
      dayNames: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Juv", "Vie", "Sáb"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
      weekHeader: "Sm",
      dateFormat: "dd-mm-yy",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ""
    };

    $.datepicker.setDefaults(defaults);
    $("#startdate")
      .datepicker()
      .on("input click", function(e) {
        console.log("Fecha salida cambiada: ", e.target.value);
      });

    $("#enddate")
      .datepicker()
      .on("input click", function(e) {
        console.log("Fecha salida cambiada: ", e.target.value);
      });
  });
}
//nest transforms plain csv data into an object and key groups that data by date
function parseData() {
  data = d3
    .nest()
    .key(function(d) {
      return d.date;
    })
    .entries(data);
}

function drawchart(drawData = data) {
  timeLapseChart = new TimeLapseChart("timelapse-chart");
  timeLapseChart
    .setTitle("COVID-19 ARGENTINA - EVOLUCIÓN EN EL TIEMPO")
    .setColumnsStyles(columnNames)
    .addDatasets(drawData)
    .render();
}

//creates basic html structure (svg and groups) when timelapse chart will be draw
function addTimeLapseChartSvg() {
  const chart = chartContainer
    .append("svg")
    .attr("id", "timelapse-chart")
    .append("g")
    .attr("class", "timelapse-chart-container");
  chart.append("text").attr("class", "timelapse-chart-title");
  chart.append("g").attr("class", "y-axis");
  chart.append("g").attr("class", "columns");
}

//removes timelapse chart completly
function clear() {
  d3.select("#timelapse-chart").remove();
  d3.select("#pause-button").node().innerHTML = "Pausar";
  d3.select("#filters-div-container").attr("class", "hidden");
}

function showFilterInputs() {
  d3.select("#filters-div-container").attr("class", null);
}

//pause and continues the timelapse chart by checking the button text
d3.select("#pause-button").on("click", function() {
  if (this.innerHTML === "Pausar") {
    this.innerHTML = "Continuar";
    timeLapseChart.stop();
  } else if (this.innerHTML === "Continuar") {
    this.innerHTML = "Pausar";
    timeLapseChart.start();
  }
});

//parse a string in date format dd-mm-YYYY to javascript date object
function stringToDate(stringDate) {
  var parts = stringDate.split("-");
  var date = new Date(parts[2], parts[1] - 1, parts[0]);
  return date;
}

//applies filters to data set and redraws the timelapse chart
d3.select("#apply-filters-and-restart-button").on("click", function() {
  var startDate = stringToDate(d3.select("#startdate").node().value);
  var endDate = stringToDate(d3.select("#enddate").node().value);

  var provincesFilter = [];
  for (let i = 0; i < columnNames.length; i++) {
    var inputCheck = d3.select("#province" + i);
    if (inputCheck.property("checked")) {
      provincesFilter.push(inputCheck.attr("value"));
    }
  }

  var filteredData = [];

  data.forEach(dailyData => {
    let filteredDailyData = dailyData.values.filter(row =>
      provincesFilter.includes(row.name)
    );

    var date = stringToDate(dailyData.key);

    if (filteredDailyData.length > 0 && date >= startDate && date <= endDate) {
      filteredData.push({ key: dailyData.key, values: filteredDailyData });
    }
  });

  timeLapseChart.stop();
  clear();
  addTimeLapseChartSvg();
  drawchart(filteredData);
  showFilterInputs();
});

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

function TimeLapseChart(chartId) {
  const chartSettings = {
    width: 700,
    height: 700,
    padding: 35,
    titlePadding: 4,
    columnPadding: 0.2,
    duration: 2000 //day duration
  };

  chartSettings.innerWidth = chartSettings.width - chartSettings.padding * 2;
  chartSettings.innerHeight = chartSettings.height - chartSettings.padding * 2;

  var chartDataSets = [];
  var columnStyles = [];
  var chartTransition;
  var timerStart, timerEnd;
  var currentDataSetIndex = 0;
  var elapsedTime = chartSettings.duration;

  const chartContainer = d3.select(`#${chartId} .timelapse-chart-container`);

  chartContainer.append("g").attr("class", "x-axis");

  const yAxisContainer = d3.select(`#${chartId} .y-axis`);
  const xAxisContainer = d3.select(`#${chartId} .x-axis`);

  const xAxisScale = d3.scaleLinear().range([0, chartSettings.innerWidth]);

  const yAxisScale = d3
    .scaleBand()
    .range([0, chartSettings.innerHeight])
    .padding(chartSettings.columnPadding);

  d3.select(`#${chartId}`)
    .attr("width", chartSettings.width + 320)
    .attr("height", chartSettings.height);

  //to make column names visible
  chartContainer.attr(
    "transform",
    `translate(${chartSettings.padding + 160}, ${chartSettings.padding})`
  );

  //moves the date label
  chartContainer
    .select(".current-date")
    .attr(
      "transform",
      `translate(${chartSettings.innerWidth}, ${chartSettings.innerHeight})`
    );

  //draws the current date values into the timelapse chart
  function draw({ key: currentDate, values }, transition) {
    const { innerHeight, titlePadding } = chartSettings;

    //oder data of provinces by the one with most infected first
    const dataSetDescendingOrder = values.sort(
      ({ value: firstValue }, { value: secondValue }) =>
        secondValue - firstValue
    );

    //removes the current date label
    //I do this to redraw the date at every render so it stays on top of svg
    chartContainer.select(".current-date").remove();

    //add the current date label and set its position
    chartContainer
      .append("text")
      .text(currentDate)
      .attr("class", "current-date")
      .attr(
        "transform",
        `translate(${chartSettings.innerWidth}, ${chartSettings.innerHeight})`
      );

    //get the max amount of infected. Since data has been previously ordered i get the first slice's value
    const maxValue = dataSetDescendingOrder[0].value;

    //ticks are lines over the x axis
    var ticks = 1;
    if (maxValue > 50) ticks = 5;
    if (maxValue > 100) ticks = 10;

    //get only the names of the ordered dataset
    var names = dataSetDescendingOrder.map(({ name }) => name);

    //set axis domains
    xAxisScale.domain([0, maxValue]);
    yAxisScale.domain(names);

    const xAxis = d3
      .axisTop(xAxisScale)
      .ticks(ticks) //ticks podria ser variable segun la barra mas larga/5
      .tickSizeOuter(0)
      .tickSizeInner(-innerHeight);

    //updates xAxis scale and ticks
    xAxisContainer.transition(transition).call(xAxis);

    //updates yAxis scale
    yAxisContainer
      .transition(transition)
      .call(d3.axisLeft(yAxisScale).tickSize(0));

    // Data Binding of columns-containers added in previous render draw iterations with previously ordered dataSet
    const barGroups = chartContainer
      .select(".columns")
      .selectAll("g.column-container")
      .data(dataSetDescendingOrder, ({ name }) => name);

    //Append the columns-containers and set their position to bottom left
    const barGroupsEnter = barGroups
      .enter()
      .append("g")
      .attr("class", "column-container")
      .attr("transform", `translate(0,${innerHeight})`);

    //gets the max height of the column container to avoid rects too large
    const maxHeight = Math.min(yAxisScale.step(), chartSettings.height / 8);

    //appends a rect of width 0 filled with the color that was set in the columnStyle of the province by name
    barGroupsEnter
      .append("rect")
      .attr("class", ({ name }) => "column-rect " + columnStyles[name])
      .attr("width", 0)
      .attr("height", maxHeight * (1 - chartSettings.columnPadding));

    //appends column-title to the left side of the previously added rect
    barGroupsEnter
      .append("text")
      .attr("class", "column-title")
      .attr("y", maxHeight * (1 - chartSettings.columnPadding))
      .attr("x", -titlePadding)
      .text(({ name }) => name);

    //appends column-value to the right side of the previously added rect
    barGroupsEnter
      .append("text")
      .attr("class", "column-value")
      .attr(
        "y",
        Math.round((maxHeight * (1 - chartSettings.columnPadding)) / 2)
      )
      .attr("x", titlePadding)
      .text(0);

    // merge bargroups for update its position
    const barUpdate = barGroupsEnter.merge(barGroups);

    //updates column position
    barUpdate
      .transition(transition)
      .attr("transform", ({ name }) => `translate(0,${yAxisScale(name)})`);

    //updates rect width and height
    barUpdate
      .select(".column-rect")
      .transition(transition)
      .attr("width", ({ value }) => xAxisScale(value))
      .attr("height", maxHeight * (1 - chartSettings.columnPadding));

    //upates column title position
    barUpdate
      .select(".column-title")
      .transition(transition)
      .attr(
        "y",
        Math.round((maxHeight * (1 - chartSettings.columnPadding)) / 2)
      );

    //updates column value position and text
    barUpdate
      .select(".column-value")
      .transition(transition)
      .attr("x", ({ value }) => xAxisScale(value) + titlePadding)
      .attr(
        "y",
        Math.round((maxHeight * (1 - chartSettings.columnPadding)) / 2)
      )
      .tween("text", function({ value }) {
        const interpolateStartValue =
          elapsedTime === chartSettings.duration
            ? this.currentValue || 0
            : +this.innerHTML;

        const interpolate = d3.interpolate(interpolateStartValue, value);
        this.currentValue = value;

        return function(t) {
          d3.select(this).text(Math.ceil(interpolate(t)));
        };
      });
    return this;
  }

  //set the data that indicate days => infected number of every argentina province
  function addDatasets(dataSets) {
    chartDataSets = dataSets;
    return this;
  }

  //set and moves title
  function setTitle(title) {
    d3.select(".timelapse-chart-title")
      .attr("x", chartSettings.width / 2)
      .attr("y", -chartSettings.padding / 2)
      .text(title);

    return this;
  }

  //set column colors its different for every province
  function setColumnsStyles(names) {
    const stylesNames = [
      "col1",
      "col2",
      "col3",
      "col4",
      "col5",
      "col6",
      "col7",
      "col8",
      "col9",
      "col10",
      "col11",
      "col12",
      "col13",
      "col14",
      "col15",
      "col16",
      "col17",
      "col18",
      "col19",
      "col20",
      "col21",
      "col22",
      "col23",
      "col24"
    ];

    columnStyles = names.reduce(
      (r, k, i) => Object.assign(r, { [k]: stylesNames[i] }),
      {}
    );

    return this;
  }

  async function render(index = 0) {
    //indicates the dataset im currently inspecting to render
    currentDataSetIndex = index;

    timerStart = d3.now();

    //sets the chart transition, its duration, its type (linear) and function callbacks for when it ends or is being interrupted
    chartTransition = chartContainer
      .transition()
      .duration(elapsedTime)
      .ease(d3.easeLinear)
      .on("end", () => {
        if (index < chartDataSets.length) {
          elapsedTime = chartSettings.duration;
          render(index + 1);
        }
      })
      .on("interrupt", () => {
        timerEnd = d3.now();
      });

    //if there is still data to render draw data using the chart transition
    if (index < chartDataSets.length) {
      draw(chartDataSets[index], chartTransition);
    }

    return this;
  }

  //interrupts any active transitions from timelapse chart components
  function stop() {
    d3.select(`#${chartId}`)
      .selectAll("*")
      .interrupt();

    return this;
  }

  //renders the the current dataset that was being render and sets the elapsed time to its previous value wich is exactly how much of the transition was draw
  function start() {
    elapsedTime -= timerEnd - timerStart;
    render(currentDataSetIndex);
    return this;
  }

  return {
    addDatasets,
    setColumnsStyles,
    render,
    setTitle,
    start,
    stop
  };
}
