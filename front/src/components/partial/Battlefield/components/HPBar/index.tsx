import React from 'react'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import styles from './HPBar.module.scss'

interface IProps {
    maxhealth: number,
    health: number,
}

const HPBar: React.FC<IProps> = () => {
    const appConstants: AppConstants | null = useSelector((state: RootState) => state.appConstants)

    return (
        <div>
            <p>HP</p>
           <div className={styles.hpBar}>
                <div className={styles.hpBar__inner} />
            </div> 
        </div>
        
    )
}

export default HPBar