import React from 'react'
import { forwardRef } from 'react'
import styles from './Box.module.scss'

type Props = {
    className?: string,
    title?: string,
    classNameTitle?: string,
    ref?: React.ForwardedRef<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>

const BoxComponent: React.FC<Props> = ({ children, className, title, classNameTitle = '', ref, ...props }) => {
    return (
        <div
            {...props}
            className={`${className} ${styles.box}`}
            ref={ref}
        >
            {title && (
                <header
                    className={`${styles.box__title} ${classNameTitle}`}
                >
                    {title}
                </header>
            )}
            {children}
        </div>
    )
}

const BoxWithRef = forwardRef<HTMLDivElement, Props>((props, ref) => {
    return (
        <BoxComponent {...props} ref={ref} />
    )
})

const Box: React.FC<Props> | React.ForwardRefRenderFunction<HTMLDivElement, Props> = (props) => {
    return (
        props.ref ? <BoxWithRef {...props} /> : <BoxComponent {...props} />
    )
}

export default Box