import React from 'react'
import { useCallback, useState } from 'react'
import { Popover } from '@mui/material'
import { PopoverPosition } from '@mui/material/Popover/Popover'
import Draggable from 'react-draggable'
import Box from 'components/base/Box'
import styles from './DraggablePopover.module.scss'

type Props = {
    classNameBox?: string,
    anchorPosition: PopoverPosition | null,
} & Omit<React.ComponentProps<typeof Popover>, 'anchorPosition'>

const DraggablePopover: React.FC<Props> = ({ 
    open, 
    title, 
    onClose, 
    anchorPosition,
    classNameBox = '',
    children
}) => {
    const [boxHeight, setBoxHeight] = useState<number>(0)

    const onRefBoxChange: React.ForwardedRef<HTMLDivElement> = useCallback((node) => {
        if (node !== null) {
            setBoxHeight(node.offsetHeight)
        }
    }, [])

    return (
        <Popover
            classes={{
                paper: styles.root
            }}
            open={open}
            anchorPosition={anchorPosition ?? undefined}
            onClose={onClose}
            anchorReference="anchorPosition"
        >
            {open &&
                <Draggable grid={[6, 6]} handle=".header">
                    <div>
                        <Box
                            ref={onRefBoxChange}
                            className={`${styles.box} ${classNameBox}`}
                            title={title}
                            classNameTitle={`${styles.title} header`}
                            style={{ transform: `translate(0, -${boxHeight}px)` }}
                        >
                            {children}
                        </Box>
                    </div>
                </Draggable>
            }
        </Popover>
    )
}

export default DraggablePopover