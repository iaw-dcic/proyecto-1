function drawGrid(game) {
  let context = canvas.getContext("2d")
  let rows = game.rows
  let cols = game.cols

  let xOffset, yOffset
  let cellState, prevStart, amount
  for(let i = 0; i < rows; i++) {
  	prevStart = 0
		for(let j = 0; j < cols; j++) {
			cellState = game.cellAlive(i, j)
			if (j !== cols-1 && cellState === game.cellAlive(i, j+1))
				continue
			else {
	  		context.fillStyle = cellState? "black" : "white"
	  		xOffset = prevStart*cellSize
	  		yOffset = i*cellSize
	  		amount = j - prevStart + 1
	  		context.fillRect(xOffset, yOffset, cellSize*amount, cellSize)
	  		prevStart = j+1
	  	}
		}
  }
}



let gameState = {
	rows: 194,
	cols: 370,
	random_factor: 0.1618033988749895,	// Golden ratio

	state:  null,
	nextState: null,

	init: function() {
		this.state = new Array(this.rows)
		this.nextState = new Array(this.rows)
		for (let i = 0; i < this.rows; i++) {
			this.state[i] = new Array(this.cols)
			this.nextState[i] = new Array(this.cols)
		}
	},

	randomize: function() {
		for (let i = 0; i < this.rows; i++)
			for (let j = 0; j < this.cols; j++)
				this.state[i][j] = (Math.random() <= this.random_factor)? true : false
	},

	cellAlive: function(x, y) {
		return this.state[x][y]
	},

	updateState: function() {
		let rows = this.rows
		let cols = this.cols
		let state = this.state
		let nextState = this.nextState
		
		for (let i = 0; i < rows; i++)
			for (let j = 0; j < cols; j++)
				nextState[i][j] = cellNextState(i, j)

		this.state = nextState
		this.nextState = state


		function cellNextState(row, col) {
			let sum = neighbourSum(row, col)
			return sum === 3 || (sum === 2 && gameState.cellAlive(row, col))
		}

		function neighbourSum(row, col) {
			let count = gameState.cellAlive(row, col)? -1 : 0
			let x, y
			for (let i = row-1; i < row+2; i++) {
				for (let j = col-1; j < col+2; j++) {
					x = (i+rows)%rows
					y = (j+cols)%cols
					if (gameState.cellAlive(x, y)) count++
				}
			}
			return count
		}
	}
}




function testStep() {
	console.log("Inicia test: "+ ++testRuns)
	console.time('Total time')
	console.time('Compute time')
	gameState.updateState()
	console.timeEnd('Compute time')
	console.time('Draw time')
	drawGrid(gameState)
	console.timeEnd('Draw time')
	console.timeEnd('Total time')
	console.log("\n")
	
}




let cellSize = 3
let running = false
let runningGame

document.getElementById("stepButton").onclick = function() {testStep()}
document.getElementById("startButton").onclick = async function() {
	if (!running) {
		running = true
		runningGame = setInterval(testStep, 5)
	}
}

$("#stopButton").click(function() {
	running = false
	clearInterval(runningGame)
})

let canvas = document.getElementById("grid");
canvas.width = gameState.cols * cellSize
canvas.height = gameState.rows * cellSize

let testRuns = 0
gameState.init()
gameState.randomize()

drawGrid(gameState)