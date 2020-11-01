import React, { Fragment, useState, useEffect } from 'react';
import AnimateLogo from '@/ui-components/Logo/Animated';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Wave from '@/ui-components/Wave';
import ResizeDetector from 'react-resize-detector';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: theme.zIndex.modal,
        backgroundColor: theme.palette.common.white,
        transition: theme.transitions.create(['transform', 'height'], {
            duration: 700,
            easing: theme.transitions.easing.extraEaseInOut,
        }),
    },
    wave: { position: 'absolute' },
    hide: {
        height: 180,
        transform: 'translateY(-100%)',
    },
    content: {
        transition: theme.transitions.create('', {
            duration: 700,
            easing: theme.transitions.easing.extraEaseInOut,
        }),
    },
    hideContent: { transform: 'translateY(30%)' },
}));

function SmoothLoad({ children }) {
    const classes = useStyles();
    const [isLoad, setIsLoad] = useState(false);
    const [isShowLogo, setIsShowLogo] = useState(false);
    const [pageWidth, setPageWidth] = useState(400);

    useEffect(() => {
        setIsShowLogo(true);
        setPageWidth(typeof document !== 'undefined' ? document?.documentElement?.clientWidth : 400);
    }, []);

    const waveHeight = Math.min(pageWidth * 0.2, 200);

    return (
        <Fragment>
            <Box className={clsx(classes.root, isLoad && classes.hide)}>
                <AnimateLogo
                    size={180}
                    time={350}
                    value={isShowLogo ? 1 : 0}
                    onEnd={(currValue) => (currValue === 1) && setIsLoad(true)}
                />
                <Wave
                    className={classes.wave}
                    width={pageWidth}
                    height={waveHeight}
                    size={isLoad ? 0 : 1}
                    time={700}
                    color="#fff"
                    style={{ bottom: `${-waveHeight + 1}px` }}
                />
            </Box>
            <Box className={clsx(classes.content, !isLoad && classes.hideContent)}>
                {children}
            </Box>
        </Fragment>
    );
}

export default SmoothLoad;
