import axios from 'axios'

export const solveBoard = (data) => {
	return (dispatch) => {
		axios.post('https://sugoku.herokuapp.com/solve', data)
			.then(result => {
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

export const fetchGiveUpBoard = (url) => {
	return (dispatch) => {
		axios.get(url)
    .then(result => {
			console.log('fetching give up board')
			dispatch (setGiveUpBoard(result.data.board))
    })
    .catch(console.log)
	}
}

export const fetchBoard = (url) => {
	return (dispatch) => {
		axios.get(url)
    .then(result => {
			console.log('fetching')
			dispatch (setBoard(result.data.board))
    })
    .catch(console.log)
	}
}

// export const set

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

const setStatus = (data) => {
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