import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeScreen from './HomeScreen';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '9rem',
        overflow: 'hidden',
        // textTransform: 'uppercase',
        fontWeight: 900,
    },
}));

function Home() {
    const classes = useStyles();

    return (
        <HomeScreen />
    );
}

export default Home;
