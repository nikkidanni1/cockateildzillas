import React from 'react'
import { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Popover } from '@material-ui/core'
import Draggable from 'react-draggable'
import Box from 'components/base/Box'

const useStyles = makeStyles({
    root: {
        overflow: 'visible',
        minWidth: 0,
        minHeight: 0,
        maxWidth: 0,
        maxHeight: 0,
        background: 'none',
        boxShadow: 'none',
    },
    box: {
        padding: '0 0 12px',
        '&::after': {
            display: 'none'
        }
    },
    title: {
        padding: '12px 12px',
        fontFamily: 'MultiTypePixel',
        fontSize: '18px',
        color: 'rgba(255,255,255,0.87)',
        marginBottom: 0,
        cursor: 'move'
    }
})

const DraggablePopover = ({ 
    isOpen, 
    title, 
    onClose, 
    anchorPosition,
    classNameBox = '',
    children
}) => {
    const [boxHeight, setBoxHeight] = useState(0)

    const classes = useStyles()

    const onRefBoxChange = useCallback(node => {
        if (node !== null) {
            setBoxHeight(node.offsetHeight)
        }
    }, [])

    return (
        <Popover
            classes={{
                paper: classes.root
            }}
            open={isOpen}
            anchorPosition={anchorPosition}
            onClose={onClose}
            anchorReference="anchorPosition"
        >
            {isOpen &&
                <Draggable grid={[8, 8]} handle=".header">
                    <div>
                        <Box
                            ref={onRefBoxChange}
                            className={`${classes.box} ${classNameBox}`}
                            title={title}
                            classNameTitle={`${classes.title} header`}
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