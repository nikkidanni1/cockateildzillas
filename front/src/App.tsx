import React from 'react'
import { useEffect } from 'react'
import type { AppDispatch } from 'store'
import { useDispatch } from 'react-redux'
import { loadAppDataThunk } from 'store/thunk'
import Router from 'router'

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(loadAppDataThunk())
    }, [])

    return (
        <Router />
    )
}

export default App
