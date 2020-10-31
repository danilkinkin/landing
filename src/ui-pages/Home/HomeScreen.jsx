import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '@/ui-components/Logo';
// import AppHeader from '@/ui-components/AppHeader';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    text: {
        maxWidth: 400,
        marginBottom: theme.spacing(4),
    },
    slogan: {
        marginTop: theme.spacing(-0.5),
        marginBottom: theme.spacing(4),
        fontWeight: 900,
    },
    appHeader: { marginBottom: theme.spacing(4) },
    marker: { color: theme.palette.secondary.main },
}));

const getCurrAge = (now = new Date()) => {
    const born = new Date('1999-02-13T22:30:00+0500');

    const correctiveMonth = now.getMonth() - born.getMonth() < 0;
    const correctiveDate = now.getMonth() === born.getMonth() && now.getDate() - born.getDate() < 0;
    const correctiveHours = now.getDate() === born.getDate() && now.getHours() - born.getHours() < 0;
    const correctiveMinutes = now.getHours() === born.getHours() && now.getMinutes() - born.getMinutes() < 0;
    const corrective = (correctiveMonth || correctiveDate || correctiveHours || correctiveMinutes) ? -1 : 0;

    return now.getFullYear() - born.getFullYear() + corrective;
};

function HomeScreen() {
    const classes = useStyles();
    const [currAge, setCurrAge] = useState(getCurrAge());

    useEffect(() => {
        const timer = setInterval(() => setCurrAge(getCurrAge()), 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Box className={classes.root}>
            <Container>
                <Logo />
                <Typography variant="body1" className={classes.slogan}>
                    web developer
                </Typography>
                <Typography variant="body1" className={classes.text}>
                    Hi, I am busy in
                    {' '}
                    <span className={classes.marker}>web application development</span>
                    , and other interesting little things.
                    My name is Danil Zakhvatkin, I am
                    {' '}
                    {currAge}
                    {' '}
                    and now I am located in Samara, Russia.
                </Typography>
                {/* <AppHeader light className={classes.appHeader} /> */}
            </Container>
        </Box>
    );
}

export default HomeScreen;
