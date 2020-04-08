const initialState = {
	loadingFetching: false,
	loadingSubmit: false,
	loadingGiveUp: false
}

const loadingReducers = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_LOADING_FETCHING':
			return {
				...state,
				loadingFetching: action.payload
			}
		case 'SET_LOADING_SUBMIT':
			return {
				...state,
				loadingSubmit: action.payload
			}
		case 'SET_LOADING_GIVEUP':
			return {
				...state,
				loadingGiveUp: action.payload
			}
		default:
			return state
	}
}

export default loadingReducers