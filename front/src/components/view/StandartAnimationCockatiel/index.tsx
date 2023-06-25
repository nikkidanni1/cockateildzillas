import React from 'react'
import { useState, useEffect } from 'react'
import CockatielStandartAnimationFrame1 from 'assets/images/CockatielStandartAnimationFrame1'
import CockatielStandartAnimationFrame2 from 'assets/images/CockatielStandartAnimationFrame2'
import CockatielStandartAnimationFrame3 from 'assets/images/CockatielStandartAnimationFrame3'
import CockatielStandartAnimationFrame4 from 'assets/images/CockatielStandartAnimationFrame4'
import styles from './StandartAnimationCockatiel.module.scss'

type Props = {
    colors: CockatielAppearanceData,
    animationStoped?: boolean,
    handleClick?: React.MouseEventHandler
} & React.HTMLAttributes<HTMLDivElement>

const orderAnimationFrames = [1, 2, 1, 2, 1, 2, 3, 4]

const StandartAnimationCockatiel: React.FC<Props> = ({ className, colors, animationStoped = false, handleClick, ...props }) => {
    const [activeFrame, setActiveFrame] = useState(0)

    useEffect(() => {
        let interval = setInterval(() => {
            if (!animationStoped) {
                setActiveFrame(prev => (
                    (prev >= orderAnimationFrames.length - 1) ? 0 : prev + 1
                ))
            }
        }, 750)

        return () => {
            clearTimeout(interval)
        }
    }, [animationStoped])

    return (
        <div
            {...props}
            className={className}
        >
            <CockatielStandartAnimationFrame1
                appearanceData={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 1 ? 'block' : 'none' }}
            />
            <CockatielStandartAnimationFrame2
                appearanceData={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 2 ? 'block' : 'none' }}
            />
            <CockatielStandartAnimationFrame3
                appearanceData={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 3 ? 'block' : 'none' }}
            />
            <CockatielStandartAnimationFrame4
                appearanceData={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 4 ? 'block' : 'none' }}
            />
        </div>
    )
}

export default StandartAnimationCockatiel