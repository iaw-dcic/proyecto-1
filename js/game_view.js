let cellSize
let canvas = document.getElementById("grid")
let gridContext = canvas.getContext("2d")

let canvasStyle = window.getComputedStyle(canvas)
let liveColor = canvasStyle.getPropertyValue("--live-cell-color")
let deadColor = canvasStyle.getPropertyValue("--dead-cell-color")

function initGrid() {
	const rows = gameState.rows
	const cols = gameState.cols
	const minCellSize = 2

	cellSize = Math.round(canvas.clientWidth/cols)
	cellSize = Math.max(cellSize, minCellSize)
	canvas.width = cellSize*cols
	canvas.height = cellSize*rows
}


function drawGrid(full = false) {
	const rows = gameState.rows
	const cols = gameState.cols
	const updatedRows = gameState.updatedRows

 	let cellState, prevStart
 	for (let i = 0; i < rows; i++) {
  		prevStart = 0
  		if (updatedRows[i] || full)
			for (let j = 0; j < cols; j++) {
				cellState = cellAlive(i, j)
				if (!(j !== cols-1 && cellState === cellAlive(i, j+1))) {
	  				drawRowSegment(i, prevStart, j, cellState)
	  				prevStart = j+1
	  			}
			}
	}
}

function drawRowSegment(row, from, to, state) {
	gridContext.fillStyle = state? liveColor : deadColor
	gridContext.fillRect(from*cellSize, row*cellSize, (to-from+1)*cellSize, cellSize)
}

function updateGridColors() {
	liveColor = canvasStyle.getPropertyValue("--live-cell-color")
	deadColor = canvasStyle.getPropertyValue("--dead-cell-color")
	drawGrid(true)
}