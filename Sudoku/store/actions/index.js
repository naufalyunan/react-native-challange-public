import axios from 'axios'

export const reset = () => {
	return {
		type: 'RESET'
	}
}

export const solveBoard = (data) => {
	return (dispatch) => {
		axios.post('https://sugoku.herokuapp.com/solve', data)
			.then(result => {
				console.log('====')
				console.log(result.data.solution)
				console.log('=====')
				dispatch (setBoard(result.data.solution))
			})
			.catch(console.log)
	}
}

export const validateBoard = (data) => {
	return (dispatch) => {
		axios.post('https://sugoku.herokuapp.com/validate', data)
			.then(result => {
				console.log(result.data.status)
				if(result.data.status === 'solved') {
					dispatch(setStatus(true))
				} else {
					dispatch(setStatus(false))
				}
			})
			.catch(console.log)
	}
}

export const fetchBoard = (url) => {
	return (dispatch) => {
		axios.get(url)
    .then(result => {
			dispatch (setGiveUpBoard(result.data.board))
			console.log('fetching')
			dispatch (setBoard(result.data.board))
    })
    .catch(console.log)
	}
}

export const setPrevDifficulty = (data) => {
	return {
		type: 'SET_PREV_DIFFICULTY',
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