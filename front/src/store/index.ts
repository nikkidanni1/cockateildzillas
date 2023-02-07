import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import TYPES from './types'

const initState: IReducerState = {
    userInfo: null,
    notifications: [],
    musicVolume: 0,
    soundVolume: 0.5,
    appLoading: true,
    appConstants: null
}

function reducer(state: IReducerState = initState, action) {
    switch (action.type) {
        case TYPES.SET_USER_INFO: {
            return { ...state, userInfo: action.payload }
        }
        case TYPES.ADD_NOTIFICATION: {
            const notifications = [ ...state.notifications ]
            notifications.push(action.payload)
            return { ...state, notifications }
        }
        case TYPES.REMOVE_NOTIFICATION: {
            const notifications = state.notifications.filter(notification => notification.id !== action.payload)
            return { ...state, notifications }
        }
        case TYPES.SET_MUSIC_VOLUME: {
            return { ...state, musicVolume: action.payload }
        }
        case TYPES.SET_SOUND_VOLUME: {
            return { ...state, soundVolume: action.payload }
        }
        case TYPES.SET_APP_LOADING: {
            return { ...state, appLoading: action.payload }
        }
        case TYPES.SET_APP_CONTANTS: {
            return { ...state, appConstants: action.payload }
        }
        default: {
            return state
        }
    }
}

const store = configureStore({ reducer, middleware: [thunk] })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store