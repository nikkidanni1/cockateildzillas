import React from 'react'
import { useState, useCallback } from 'react'
import Popover from '@mui/material/Popover';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import styles from './HelpPopover.module.scss'

interface IProps {
    popoverProps?: Partial<React.ComponentProps<typeof Popover>>,
    paperClassName?: string,
    children: React.ReactNode,
}

const HelpPopover: React.FC<IProps> = ({ popoverProps, paperClassName, children }) => {
    const [anchorEl, setAnchorEl] = useState<SVGElement | null>(null)

    const handleClick = useCallback((event: React.MouseEvent<SVGElement>) => {
        setAnchorEl(event.currentTarget)
    }, [])

    const handleClose = () => {
        setAnchorEl(null)
    };
    return (
        <>
            <HelpOutlineIcon onClick={handleClick} />
            <Popover
                {...popoverProps}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                PaperProps={{
                    classes: {
                        root: `${styles.paper} ${paperClassName ?? ''}`
                    }
                }}
            >
                {children}
            </Popover>
        </>
    )
}

export default HelpPopover