import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PrettyLink from '@/ui-components/PrettyLink';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    mailLink: { marginLeft: 'auto' },
    link: { marginRight: theme.spacing(4) },
    light: {
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
        },
    },
}));

function AppHeader({ light = false, className: externalClassName }) {
    const classes = useStyles();

    return (
        <Box className={clsx(classes.root, externalClassName)}>
            <PrettyLink
                url="/contacts"
                label="contacts"
                className={clsx(classes.link, light && classes.light)}
            />
            <PrettyLink
                url="/projects"
                label="projects"
                className={clsx(classes.link, light && classes.light)}
            />
            <PrettyLink
                url="mailto:hello@danilkinkin.com"
                label="hello@danilkinkin.com"
                className={clsx(classes.mailLink, light && classes.light)}
            />
        </Box>
    );
}

export default AppHeader;
