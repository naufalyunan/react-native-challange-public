import { combineReducers } from 'redux'

import boardReducers from './boardReducers'
import loadingReducers from './loadingReducers'

const rootReducers = combineReducers({
	board: boardReducers,
	loading: loadingReducers
})

export default rootReducers