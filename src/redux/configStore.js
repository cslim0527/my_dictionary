import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import card from './modules/card'

const middlewares = [thunk]
const enhancer = applyMiddleware(...middlewares)
const rootReducer = combineReducers({card})

const store = createStore(rootReducer, enhancer)

export default store