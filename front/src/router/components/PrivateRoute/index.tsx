import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Navigate } from 'react-router-dom'
import type { RouteProps } from 'react-router-dom'
import type { RootState } from 'store'

const PrivateRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    return (
        <Route
            {...rest}
            element={
                userInfo ?
                    element : <Navigate to="/" />
            }
        />
    )
}

export default PrivateRoute