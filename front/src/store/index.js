import { createStore } from 'redux'
import TYPES from './types'

const initState = {
    userInfo: null,
    error: '',
    notifyMessage: '',
    musicVolume: 0,
    soundVolume: 0.5,
    appLoading: true
}

function reducer (state = initState, action) {
    switch (action.type) {
        case TYPES.SET_USER_INFO: {
            return { ...state, userInfo: action.payload }
        }
        case TYPES.SET_ERROR: {
            return { ...state, error: action.payload }
        }
        case TYPES.SET_NOTIFY_MESSAGE: {
            return { ...state, notifyMessage: action.payload }
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
        default: {
            return state
        }
    }
}

const store = createStore(reducer)

export default store