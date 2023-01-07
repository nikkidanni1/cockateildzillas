import React from 'react'
import { useState, useEffect } from 'react'
import CockateilStandartAnimationFrame1 from 'assets/images/CockateilStandartAnimationFrame1'
import CockateilStandartAnimationFrame2 from 'assets/images/CockateilStandartAnimationFrame2'
import CockateilStandartAnimationFrame3 from 'assets/images/CockateilStandartAnimationFrame3'
import CockateilStandartAnimationFrame4 from 'assets/images/CockateilStandartAnimationFrame4'
import styles from './StandartAnimationCockateil.module.scss'

type Props = {
    colors: CockateilAppearanceData,
    animationStoped?: boolean,
    handleClick: React.MouseEventHandler
} & React.HTMLAttributes<HTMLDivElement>

const orderAnimationFrames = [1, 2, 1, 2, 1, 2, 3, 4]

const StandartAnimationCockateil: React.FC<Props> = ({ className, colors, animationStoped = false, handleClick, ...props }) => {
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
            <CockateilStandartAnimationFrame1
                appearanceData={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 1 ? 'block' : 'none' }}
            />
            <CockateilStandartAnimationFrame2
                appearanceData={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 2 ? 'block' : 'none' }}
            />
            <CockateilStandartAnimationFrame3
                appearanceData={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 3 ? 'block' : 'none' }}
            />
            <CockateilStandartAnimationFrame4
                appearanceData={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 4 ? 'block' : 'none' }}
            />
        </div>
    )
}

export default StandartAnimationCockateil