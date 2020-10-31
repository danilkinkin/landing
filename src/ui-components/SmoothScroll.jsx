import React, { useRef, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/dist/plugins/overscroll';
// import ViewScrollPlugin from '@/utils/ViewScrollPlugin';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.paper,
    },
    // scrollBar: scrollbarClasses(theme).scrollBar,
    hideScroll: { opacity: 0 },
}));

function SmoothScroll({ children, onScroll }) {
    const classes = useStyles();
    const rootRef = useRef(null);

    useEffect(() => {
        Scrollbar.use(/* ViewScrollPlugin, */OverscrollPlugin);

        const scrollbar = Scrollbar.init(rootRef.current, {
            damping: 0.25,
            thumbMinSize: 0,
            continuousScrolling: true,
            syncCallbacks: true,
            plugins: {
                overscroll: {
                    effect: 'bounce',
                    maxOverscroll: 150,
                },
                /* viewScrollPlugin: {
                    breakpoints: [
                        {
                            id: 'splashScreen',
                            value: 0,
                            block: true,
                        },
                        {
                            id: 'content',
                            value: document.documentElement.clientHeight / 2,
                        },
                    ],
                    detectOffset: 70,
                    onBreakpoint: (breakpoint) => {

                    },
                }, */
            },
        });

        Scrollbar.detachStyle();

        scrollbar.track.xAxis.element.remove();

        scrollbar.addListener(({ offset: { y } }) => onScroll(y));

        console.log('scrollbar', scrollbar);
    }, []);

    return (
        <Box
            className={classes.root}
            ref={rootRef}
        >
            {children}
        </Box>
    );
}

export default SmoothScroll;
