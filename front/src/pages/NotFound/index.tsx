import React from 'react'
import { useLocation } from 'react-router-dom'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import styles from './NotFound.module.css'

const NotFound: React.FC = () => {
    const location = useLocation()

    const appLoading: boolean = useSelector((state: RootState) => state.appLoading)
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)

    return (
        <>
            {!appLoading && (
                <p className={styles.notFound}>
                    {(location.pathname.includes('/account') && !userInfo) ? '401 Unauthorized' : '404 Not Found'}
                </p>
            )}
        </>
    )
}

export default NotFound