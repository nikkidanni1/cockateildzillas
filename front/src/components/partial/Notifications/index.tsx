import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from 'store'
import Notification from 'components/base/Notification'
import styles from './Notifications.module.scss'

const Notifications: React.FC = () => {
    const notifications: Array<NotificationMessage> = useSelector((state: RootState) => state.notifications)
    return (
        <div className={styles.notifications}>
            {notifications.map(notification => (
                <Notification notification={notification} />
            ))}
        </div>
    )
}

export default Notifications