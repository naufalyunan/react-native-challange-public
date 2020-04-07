import { combineReducers } from 'redux'

import boardReducers from './boardReducers'

const rootReducers = combineReducers({
	board: boardReducers
})

export default rootReducers