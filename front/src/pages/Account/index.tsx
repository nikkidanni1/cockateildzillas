import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import Box from 'components/base/Box'
import styles from './Account.module.scss'

const Account: React.FC = () => {
    const navigate = useNavigate()

    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const appLoading: number = useSelector((state: RootState) => state.appLoading)

    useEffect(() => {
        if (userInfo && (!userInfo?.cockatiel || !userInfo?.nickname)) {
            navigate('/account/edit')
        }
    }, [userInfo])

    return (
        <>
            {
                appLoading === 0 && (
                    <Box className={styles.box}>
                        <div>Hello friend!</div>
                    </Box>
                )
            }
        </>

    )
}

export default Account