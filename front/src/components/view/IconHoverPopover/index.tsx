import React from 'react'
import { useState, useCallback } from 'react'
import Popover from '@mui/material/Popover';
import styles from './IconHoverPover.module.scss'

interface IProps {
    popoverProps?: Partial<React.ComponentProps<typeof Popover>>,
    paperClassName?: string,
    iconProps?: React.SVGAttributes<SVGElement>,
    Icon: React.FC<React.SVGAttributes<SVGElement>>;
    children: React.ReactNode,
}

const IconHoverPopover: React.FC<IProps> = ({ 
    popoverProps,
    paperClassName = '',
    iconProps,
    Icon,
    children,
}) => {
    const [anchorEl, setAnchorEl] = useState<SVGElement | null>(null)

    const handlePopoverOpen = useCallback((event: React.MouseEvent<SVGElement>) => {
        setAnchorEl(event.currentTarget)
    }, [])

    const handlePopoverClose = () => {
        setAnchorEl(null)
    };

    return (
        <>
            <Icon
                {...iconProps}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            />
            <Popover
                {...popoverProps}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                PaperProps={{
                    classes: {
                        root: `${styles.paper} ${paperClassName}`
                    }
                }}
                sx={{
                    pointerEvents: 'none',
                }}
                disableRestoreFocus
            >
                {children}
            </Popover>
        </>
    )
}

export default IconHoverPopover