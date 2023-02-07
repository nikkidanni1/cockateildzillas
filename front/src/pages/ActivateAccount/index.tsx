import React from 'react'
import { useEffect, useCallback } from 'react'
import type { AppDispatch } from 'store'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { activateUser } from 'api'
import { addNotification } from 'store/actions'

const ActivateAccount: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        onActivateUser()
    }, [])

    const onActivateUser = useCallback(async () => {
        const response = await activateUser(location.pathname.replace('/activate/', ''))
        if (response.error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: response.error,
                mode: 'error'
            }))
        }
        if (response.responseBody?._id) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: 'Пользователь успешно активирован',
                mode: 'info'
            }))
        }
        navigate('/login')
    }, [])

    return (
        <div
            style={{
                position: 'relative'
            }}
        >
            Activation...
        </div>
    )
}

export default ActivateAccount