import React, { useEffect } from 'react'
import { getUsers } from 'api'
import Box from 'components/base/Box'
import styles from './UserListPage.module.scss'

const UserListPage: React.FC = () => {
    useEffect(() => {
        console.log(getUsers(0, 10))
    }, [])

    return (
        <Box className={styles.box}>
            1
        </Box>
    )
}

export default UserListPage