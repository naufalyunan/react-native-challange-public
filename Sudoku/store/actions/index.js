import axios from 'axios'

export const setMessage = (data) => {
	return {
		type: 'SET_MESSAGE',
		payload: data
	}
}

export const reset = () => {
	return {
		type: 'RESET'
	}
}

export const solveBoard = (data) => {
	return (dispatch) => {
		dispatch(setLoadingGiveUp(true))
		axios.post('https://sugoku.herokuapp.com/solve', data)
			.then(result => {
				console.log('====')
				console.log(result.data.solution)
				console.log('=====')
				dispatch (setBoard(result.data.solution))
			})
			.catch(console.log)
			.finally(_ =>  dispatch(setLoadingGiveUp(false)))
	}
}

export const validateBoard = (data) => {
	return (dispatch) => {
		dispatch(setLoadingSubmit(true))
		axios.post('https://sugoku.herokuapp.com/validate', data)
			.then(result => {
				console.log(result.data.status)
				if(result.data.status === 'solved') {
					dispatch(setStatus(true))
				} else {
					dispatch(setMessage('Board Invalid'))
					dispatch(setStatus(false))
				}
			})
			.catch(console.log)
			.finally(_ => dispatch(setLoadingSubmit(false)))
	}
}

export const fetchBoard = (url) => {
	return (dispatch) => {
		dispatch(setLoadingFetching(true))
		axios.get(url)
    .then(result => {
			console.log('fetching dari action')
			const changeRef = result.data.board.map(el => { return [...el] })
			dispatch (setGiveUpBoard(changeRef))
			dispatch (setBoard(result.data.board))
			// console.log(result.data.board)
    })
		.catch(console.log)
		.finally(_ => dispatch(setLoadingFetching(false)))
	}
}

const setLoadingGiveUp = (data) => {
	return {
		type: 'SET_LOADING_GIVEUP',
		payload: data
	}
}

const setLoadingFetching = (data) => {
	return {
		type: 'SET_LOADING_FETCHING',
		payload: data
	}
}

const setLoadingSubmit = (data) => {
	return {
		type: "SET_LOADING_SUBMIT",
		payload: data
	}
}

export const setDifficulty = (data) => {
	return {
		type: 'SET_DIFFICULTY',
		payload: data
	}
}

export const setName = (data) => {
	return {
		type: 'SET_NAME',
		payload: data
	}
}

export const setStatus = (data) => {
	return {
		type: 'SET_STATUS',
		payload: data
	}
}

const setGiveUpBoard = (data) => {
	return {
		type: 'SET_GIVEUP_BOARD',
		payload: data
	}
}

const setBoard = (data) => {
	return {
		type: 'SET_BOARD',
		payload: data
	}
}

export const setElement = (data) => {
	return {
		type: 'SET_ELEMENT',
		payload: data
	}
}