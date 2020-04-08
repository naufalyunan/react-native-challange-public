const initialState = {
	board: [],
	giveUpBoard: [],
	status: false,
	name: '',
	difficulty: '',
	message: ''
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
			console.log('=======')
			console.log('*******')
			console.log(state.board)
			console.log(state.giveUpBoard)
			console.log('*******')
			console.log('=======')

			return {
				...state
			}
		case 'RESET': 
			return {
				...state,
				board: [],
				giveUpBoard: [],
				status: false,
				message: ''
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
		case 'SET_MESSAGE':
			return {
				...state,
				message: action.payload
			}
		default:
			return state
	}
}

export default boardReducers