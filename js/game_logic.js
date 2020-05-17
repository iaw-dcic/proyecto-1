let gameState = {
	rows: 0,
	cols: 0,
	random_factor: 0.1618033988749895,	// Golden ratio
	generation: 0,
	cellCount: 0,

	board: null,
	nextBoard: null,
	updatedRows: null,
	nextUpdatedRows: null
}

function initState(rows, cols) {
	gameState.rows = rows
	gameState.cols = cols

	gameState.board = new Array(rows)
	gameState.nextBoard = new Array(rows)

	gameState.updatedRows = new Array(rows)
	gameState.nextUpdatedRows = new Array(rows)
	
	gameState.savedBoard = new Array(rows)
	gameState.savedRows = new Array(rows)

	for (let i = 0; i < rows; i++) {
		gameState.updatedRows[i] = true
		gameState.board[i] = new Array(cols)
		gameState.nextBoard[i] = new Array(cols)
		gameState.savedBoard[i] = new Array(cols)
		for (let j = 0; j < cols; j++)
			gameState.board[i][j] = false
	}
}

function randomize() {
	const rows = gameState.rows
	const cols = gameState.cols
	const board = gameState.board
	const updatedRows = gameState.updatedRows
	const random_factor = gameState.random_factor

	const hs = Math.round(rows/6)
	const ls = Math.round(cols/6)
	const rad = Math.min(hs, ls) *0.8

	const c1 = {x: 5*ls, y: 2*hs, r: rad}
	const c2 = {x: ls, y: 2*hs, r: rad}
	const c3 = {x: ls, y: 4*hs, r: rad}
	const c4 = {x: 5*ls, y: 4*hs, r: rad}
	const c5 = {x: 3*ls, y: 3*hs, r: 2*rad}

	const circles = [c1, c2, c3, c4, c5]
	let liveCell

	for (let i = 0; i < rows; i++) {
		updatedRows[i] = true
		for (let j = 0; j < cols; j++) {
			for (let k = 0; k < circles.length; k++) {
				if (insideCircle(circles[k], {x: j, y: i})) {
					liveCell = Math.random() < random_factor
					board[i][j] = liveCell
					if (liveCell)
						gameState.cellCount++
				}
			}
		}
	}

	function insideCircle(circle, point) {
		const xDist = Math.abs(circle.x - point.x)
		const yDist = Math.abs(circle.y - point.y)
		
		return Math.sqrt(xDist*xDist + yDist*yDist) <= circle.r + Math.random()*circle.r/3
	}
}

function cellAlive(x, y) {
	return gameState.board[x][y]
}

function updateState() {
	const rows = gameState.rows
	const cols = gameState.cols
	const board = gameState.board
	const nextBoard = gameState.nextBoard
	const updatedRows = gameState.updatedRows
	const nextUpdatedRows = gameState.nextUpdatedRows

	let changedCells = 0
	let changed
	let newState

	for (let i = 0; i < rows; i++) {
		if (updatedRows[i]) {
			updatedRows[i] = false
			changed = false
			for (let j = 0; j < cols; j++) {
				newState = cellNextState(i, j)
				nextBoard[i][j] = newState
				if (newState !== board[i][j]) {
					changedCells = (newState)? changedCells+1 : changedCells-1
					changed = true
				}
			}

			if (changed) {
				nextUpdatedRows[(i+rows-1)%rows] = true
				nextUpdatedRows[i] = true
				nextUpdatedRows[(i+1)%rows] = true
			}
		}
	}

	gameState.generation++
	gameState.cellCount += changedCells

	gameState.board = nextBoard
	gameState.nextBoard = board 
	gameState.updatedRows = nextUpdatedRows
	gameState.nextUpdatedRows = updatedRows


	function cellNextState(row, col) {
		let sum = neighbourSum(row, col)
		return sum === 3 || (sum === 2 && cellAlive(row, col))
	}

	function neighbourSum(row, col) {
		let count = cellAlive(row, col)? -1 : 0
		let x, y
		for (let i = row-1; i < row+2; i++) {
			for (let j = col-1; j < col+2; j++) {
				x = (i+rows)%rows
				y = (j+cols)%cols
				if (cellAlive(x, y)) count++
			}
		}
		return count
	}
}

function minState() {
	let min_state = {
		board: gameState.board,
		generation: gameState.generation
	}

	return min_state
}

function loadState(min_state) {
	const board = min_state.board
	const rows = board.length
	const cols = board[0].length
	const gens = min_state.generation

	initState(rows, cols)

	let count = 0
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			cellState = board[i][j]
			gameState.board[i][j] = cellState
			if (cellState) count++
		}
	}

	gameState.cellCount = count
	gameState.generation = gens
}

function clearState() {
	const rows = gameState.rows
	const cols = gameState.cols
	const board = gameState.board
	const updatedRows = gameState.updatedRows

	for (let i = 0; i < rows; i++) {
		updatedRows[i] = true
		for (let j = 0; j < cols; j++) {
			 board[i][j] = false
		}
	}

	gameState.cellCount = 0
	gameState.generation = 0
}

function modifyState(row, col, cellState) {
	const rows = gameState.rows
	const board = gameState.board
	const updatedRows = gameState.updatedRows
	
	let prevState = board[row][col]
	board[row][col] = cellState

	if (prevState !== cellState)
		if (cellState)
			gameState.cellCount++
		else
			gameState.cellCount--

	updatedRows[(row+rows-1)%rows] = true
	updatedRows[row] = true
	updatedRows[(row+1)%rows] = true
}

function resizeBoard(newRows, newCols) {
	const oldRows = gameState.rows
	const oldCols = gameState.cols
	const oldBoard = gameState.board
	const oldUpdated = gameState.updatedRows

	initState(newRows, newCols)
	const newBoard = gameState.board
	const newUpdated = gameState.updatedRows

	const rowsDiff = Math.abs(Math.round((newRows - oldRows) / 2))
	const colsDiff = Math.abs(Math.round((newCols - oldCols) / 2))

	const bigger = newRows - oldRows > 0

	if (bigger)
		for (let i = 0; i < oldRows; i++)
			for (let j = 0; j < oldCols; j++)
				newBoard[i+rowsDiff][j+colsDiff] = oldBoard[i][j]
	else
		for (let i = 0; i < newRows; i++)
			for (let j = 0; j < newCols; j++)
				newBoard[i][j] = oldBoard[i+rowsDiff][j+colsDiff]

}