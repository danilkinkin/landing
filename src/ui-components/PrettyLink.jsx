import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        textDecoration: 'none',
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
    },
    dot: {
        borderRadius: '50%',
        width: 4,
        height: 4,
        backgroundColor: 'currentColor',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: theme.spacing(0.5),
    },
}));

function PrettyLink({ url, label, className: externalClassName, ...other }) {
    const classes = useStyles();

    return (
        <a
            className={clsx(classes.root, externalClassName)}
            href={url}
            {...other}
        >
            <div className={classes.dot} />
            {label}
        </a>
    );
}

export default PrettyLink;
