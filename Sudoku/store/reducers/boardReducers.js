const initialState = {
	board: [],
	giveUpBoard: [],
	status: false,
	name: '',
	difficulty: 'easy'
}

const boardReducers = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_BOARD':
			return {
				...state,
				board: action.payload
			}	
		case 'SET_GIVEUP_BOARD': 
			return {
				...state,
				giveUpBoard: action.payload
			}
		case 'SET_ELEMENT': 
			const row = action.payload.rowIndex
			const col = action.payload.colIndex
			const data = action.payload.data
			state.board[row][col] = data
			// for (let i = 0; i < state.board.length; i++) {
			// 	for (let j = 0; j < state.board[i].length; j++) {
			// 		if(i === row && j === col){
			// 			state.board[i][j] = data
			// 		}
			// 	}
			// }
			return {
				...state
			}
		case 'SET_STATUS':
			return {
				...state,
				status: action.payload
			}
		case 'SET_NAME':
			return {
				...state,
				name: action.payload
			}
		case 'SET_DIFFICULTY':
			return {
				...state,
				difficulty: action.payload
			}
		default:
			return state
	}
}

export default boardReducers