import * as React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './LoadingComponent.module.scss'

const LoadingComponent: React.FC = () => {
    const loadingProgressRef = useRef<HTMLDivElement | null>(null)
    const animationProgressId = useRef<number | null>(null)
    const loadingDotsRef = useRef<HTMLSpanElement | null>(null)
    const animationDotsId = useRef<number | null>(null)

    const [capacityChuncks, setCapacityChuncks] = useState<number>(0)

    useEffect(() => {
        if (loadingProgressRef.current) {
            const widthLoadingProgress: number = loadingProgressRef.current.offsetWidth
            const columntGapLoadingProgress: number = parseInt(getComputedStyle(loadingProgressRef.current).getPropertyValue('column-gap'))
            const chunks: number = Math.trunc((widthLoadingProgress - 10) / (10 + columntGapLoadingProgress) + 1)
            setCapacityChuncks(chunks)
        }
    }, [loadingProgressRef.current])

    const animateDrawProgress = useCallback((timeFraction: number) => {
        const visibleChunks = Math.trunc(timeFraction * (capacityChuncks))
        for (let i = 0; i < capacityChuncks; i++) {
            const childElem: HTMLDivElement | undefined = loadingProgressRef.current?.children[i] as HTMLDivElement ?? undefined
            const conditionVisible: boolean = (
                (visibleChunks + 2 >= i) && (visibleChunks <= i)
                || ((visibleChunks + 2 >= capacityChuncks) && (i <= (visibleChunks + 2) % capacityChuncks))
            )

            if (childElem && conditionVisible) {
                childElem.style.opacity = '1'
            } else if (childElem) {
                childElem.style.opacity = '0'
            }
        }
    }, [capacityChuncks, loadingProgressRef.current])

    const animate = useCallback((
        start: number,
        duration: number,
        animateDraw: (timeFraction: number) => void,
        idRef: React.MutableRefObject<number | null>
    ) => (time: number) => {
        let timeFraction = (time - start) / duration
        if (timeFraction > 1) {
            timeFraction = 1
            start = performance.now()
        }

        animateDraw(timeFraction)

        if (idRef.current) {
            idRef.current = requestAnimationFrame(animate(start, duration, animateDraw, idRef))
        }
    }, [])

    useEffect(() => {
        if (loadingProgressRef.current && capacityChuncks !== 0) {
            let start = performance.now()
            animationProgressId.current = requestAnimationFrame(animate(start, 3000, animateDrawProgress, animationProgressId))
        }
    }, [loadingProgressRef.current, capacityChuncks])

    const animateDrawDots = useCallback((timeFraction: number) => {
        if (loadingDotsRef.current === null) {
            return
        }
        const dotsQuantity: number = 3
        loadingDotsRef.current.textContent = '.\u202f'.repeat(Math.round(dotsQuantity * timeFraction))
    }, [loadingDotsRef.current])

    useEffect(() => {
        if (loadingDotsRef.current && capacityChuncks !== 0) {
            let start = performance.now()
            animationDotsId.current = requestAnimationFrame(animate(start, 1000, animateDrawDots, animationDotsId))
        }
    }, [loadingDotsRef.current])

    useEffect(() => {
        return () => {
            animationProgressId.current && cancelAnimationFrame(animationProgressId.current)
            animationDotsId.current && cancelAnimationFrame(animationDotsId.current)
        }
    }, [animationProgressId, animationDotsId])

    return (
        <div className={styles.loading__wrapper}>
            <div className={styles.loading}>
                <div ref={loadingProgressRef} className={styles.loading__progress}>
                    {new Array(capacityChuncks).fill(null).map((_, i) => (
                        <div className={styles.loading__progressChunk} key={i} />
                    ))}
                </div>
            </div>
            <p className={styles.loading__text}>Loading <span className={styles.loading__dots} ref={loadingDotsRef} /></p>
        </div>
    )
}

export default LoadingComponent