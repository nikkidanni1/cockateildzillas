import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from 'store'

type Props = {
    element: React.ReactElement
}

const PrivateRoute: React.FC<Props> = ({ element }) => {
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    return (
        userInfo ?
            element : <Navigate to="/" />
    )
}

export default PrivateRoute