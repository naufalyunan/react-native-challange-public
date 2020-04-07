const initialState = {
	board: [],
	// [[8, 3, 4, 6, 7, 9, 2, 5, 1], [1, 2, 5, 3, 4, 8, 6, 7, 9], [6, 7, 9, 1, 2, 5, 3, 4, 8], [2, 1, 3, 4, 5, 6, 8, 9, 7], [4, 5, 6, 8, 9, 7, 1, 2, 3], [7, 9, 8, 2, 1, 3, 4, 6, 5], [3, 4, 7, 5, 6, 1, 9, 8, 2], [5, 6, 1, 9, 8, 2, 7, 3, 4], [9, 8, 2, 7, 3, 4, 5, 1, 6]],
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
		case 'SET_ELEMENT': 
			const row = action.payload.rowIndex
			const col = action.payload.colIndex
			const data = action.payload.data
			state.board[row][col] = data
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