import React from 'react'
import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { activateUser } from 'api'
import { setError, setNotifyMessage } from 'store/actions'

const ActivateAccount: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        onActivateUser()
    }, [])

    const onActivateUser = useCallback(async () => {
        const response = await activateUser(history.location.pathname.replace('/activate/', ''))
        if (response.error) {
            dispatch(setError(response.error))
        }
        if (response.responseBody?._id) {
            dispatch(setNotifyMessage('Пользователь успешно активирован'))
        }
        history.push('/login')
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