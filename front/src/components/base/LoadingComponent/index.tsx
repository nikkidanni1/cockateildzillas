import * as React from 'react'
import { CircularProgress } from '@mui/material'
import styles from './LoadingComponent.module.scss'

const LoadingComponent: React.FC = () => {
    return (
        <CircularProgress className={styles.root} />
    )
}

export default LoadingComponent