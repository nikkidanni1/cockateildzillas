import React from 'react'
import { useMemo } from 'react'
import styles from './HPBar.module.scss'

interface IProps {
    maxhealth: number,
    health: number,
    isAdversary: boolean,
}

const HPBar: React.FC<IProps> = ({ health, maxhealth, isAdversary }) => {
    const hp = useMemo(() => (
        health * (maxhealth / 100)
    ), [health, maxhealth])

    return (
        <div className={`${styles.hp} ${isAdversary ? styles.hp_adversary : ''}`}>
            <p className={`${styles.hp__title} ${isAdversary ? styles.hp__title_adversary : ''}`}>HP</p>
            <div className={styles.hpBar}>
                <div className={`${styles.hpBar__inner} ${isAdversary ? styles.hpBar__inner_adversary : '' }`} style={{ width: `${hp}%` }} />
                <span className={styles.hpBar__text}>{`${health} / ${maxhealth}`}</span>
            </div>
        </div>
    )
}

export default HPBar