import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
        <Box className={classes.root}>Danilkinkin</Box>
    );
}

export default Home;
