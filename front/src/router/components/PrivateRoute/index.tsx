import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from 'store'

type Props = {
    element: React.ReactElement
}

const PrivateRoute: React.FC<Props> = ({ element }) => {
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const appLoading: number = useSelector((state: RootState) => state.appLoading)
    const initLoading: boolean = useSelector((state: RootState) => state.initLoading)

    return (
        (appLoading !== 0 || initLoading || (appLoading === 0 && userInfo)) ?
            element : <Navigate to="/" />
    )
}

export default PrivateRoute