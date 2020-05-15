function setUpDrawing() {
	let drawing = false
	let drawingState

	canvas.addEventListener('mousedown', e => {
	    if (!drawing) {
	    	paintClickedCell(e, true)
	    	updateScores()
	    	drawing = true
	    }
	})

	canvas.addEventListener('mousemove', e => {
		if (drawing) {
			paintClickedCell(e)
			updateScores()
	 	}
	})

	canvas.addEventListener('mouseup', e => {
		if (drawing) {
			paintClickedCell(e)
			updateScores()
			drawing = false;
		}
	})

	canvas.addEventListener('mouseleave', e => {
		drawing = false;
	})


	function paintClickedCell(e, checkState = false) {
		let cell = getClickedCell(e)
		
		if (checkState)
			drawingState = !cellAlive(cell.row, cell.col)
		
		modifyState(cell.row, cell.col, drawingState)
		drawRowSegment(cell.row, cell.col, cell.col, drawingState)
	}


	function getClickedCell(event) {
	    let mouseX = event.offsetX * canvas.width / canvas.clientWidth | 0
    	let mouseY = event.offsetY * canvas.height / canvas.clientHeight | 0
	    let col = Math.floor(mouseX/cellSize)
	    let row = Math.floor(mouseY/cellSize)
	    return {row: row, col:col}
	}
}


function setUpButtons() {
	let running = false
	let runningGame

	$("#reloadButton").click(function() {
		pauseGame()
		loadState(retrieveLocalStorage())
		initGrid()
		drawGrid()
		updateScores()
		this.blur()
	})

	$("#stepButton").click(function() {
		step()
		this.blur()
	})

	$("#startButton").click(function() {
		startGame()
		this.blur()
	})

	$("#stopButton").click(function() {
		pauseGame()
		this.blur()
	})

	$("#clearButton").click(function() {
		pauseGame()
		clearState()
		drawGrid()
		updateScores()
		this.blur()
	})

	$("#saveButton").click(function() {
		pauseGame()
		saveToLocalStorage(minState())
		this.blur()
	})

	$("#randomizeButton").click(function() {
		pauseGame()
		clearState()
		randomize()
		drawGrid()
		updateScores()
		this.blur()
	})

	$("#themeButton").click(function() {
		darkTheme = !darkTheme
		setTheme()
		this.blur()
	})



	function startGame() {
		if (!running) {
			running = true
			runningGame = setInterval(step, 20)
		}
	}

	function pauseGame() {
		if (running) {
			running = false
			clearInterval(runningGame)
		}
	}

	function step() {
		updateState()
		drawGrid()
		updateScores()
	}
}


const STATE_KEY = "SAVED_STATE"

function saveToLocalStorage(state) {
	let stringState = JSON.stringify(state)
	window.localStorage.setItem(STATE_KEY, stringState)
}

function retrieveLocalStorage() {
	let stringState = window.localStorage.getItem(STATE_KEY)
	return JSON.parse(stringState)
}

function setUpSlider() {
	$("#sizeSlider").attr('min', minSide)
	$("#sizeSlider").attr('max', maxSide)
	$("#sizeSlider").attr('step', 2)

	$("#sizeSlider").on('input', function() {
		configBoardSize(parseInt(this.value))
		resizeBoard(boardRows, boardCols)
		initGrid()
		drawGrid()
		updateScores()
	})
}

function updateScores() {
	$("#gensTxt").text("Gen: "+gameState.generation)
	$("#cellsTxt").text("Cells: "+gameState.cellCount)
}

let boardRows
let boardCols
const minSide = 10
const maxSide = 400
let startingSize = Math.round(maxSide/4)

function configBoardSize(side) {
	const ratio = $(window).width() / $(window).height()
	const landscape = ratio >= 1

	if (landscape) {
		boardRows = side
		boardCols = Math.round(ratio*side)
	}
	else {
		boardCols = side
		boardRows = Math.round(side/ratio)
	}
}


let darkTheme = false
const THEME_KEY = "THEME_KEY"

function configTheme() {
	let value = window.localStorage.getItem(THEME_KEY)
	if (value !== null) {
		value = (value === "true")? true : false
		console.log(value)
		darkTheme = value
		if (value) setTheme()
	}
}

function setTheme() {
	if (darkTheme) {
		document.body.classList.remove("light-theme")
    	document.body.classList.add("dark-theme")
	}
	else {
		document.body.classList.remove("dark-theme")
    	document.body.classList.add("light-theme")
	}
	updateGridColors()
	window.localStorage.setItem(THEME_KEY, darkTheme)
}

// Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip({
  	delay: {
        show: 500,
        hide: 0
    }
  })
})



configBoardSize(startingSize)

initState(boardRows, boardCols)
randomize()

initGrid()
drawGrid()
updateScores()

setUpDrawing()
setUpButtons()
setUpSlider()
configTheme()