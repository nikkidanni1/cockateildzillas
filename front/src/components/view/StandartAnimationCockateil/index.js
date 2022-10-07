import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CockateilStandartAnimationFrame1 from 'assets/images/CockateilStandartAnimationFrame1'
import CockateilStandartAnimationFrame2 from 'assets/images/CockateilStandartAnimationFrame2'
import CockateilStandartAnimationFrame3 from 'assets/images/CockateilStandartAnimationFrame3'
import CockateilStandartAnimationFrame4 from 'assets/images/CockateilStandartAnimationFrame4'

const useStyles = makeStyles({
    animationFrame: {

    }
})

const orderAnimationFrames = [1, 2, 1, 2, 1, 2, 3, 4]

const StandartAnimationCockateil = ({ className, colors, animationStoped = false, refs, handleClick, ...props }) => {
    const classes = useStyles()
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
                colors={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 1 ? 'block' : 'none' }}
            />
            <CockateilStandartAnimationFrame2
                colors={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 2 ? 'block' : 'none' }}
            />
            <CockateilStandartAnimationFrame3
                colors={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 3 ? 'block' : 'none' }}
            />
            <CockateilStandartAnimationFrame4
                colors={colors}
                onClick={handleClick}
                style={{ display: orderAnimationFrames[activeFrame] === 4 ? 'block' : 'none' }}
            />
        </div>
    )
}

export default StandartAnimationCockateil