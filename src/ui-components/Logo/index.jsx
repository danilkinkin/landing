import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LogoText from '@/images/logo_text.svg';
import LogoIcon from '@/images/logo_icon.svg';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    fullIcon: {
        verticalAlign: 'middle',
        marginRight: 16,
        marginLeft: -66,
        height: 'auto',
        width: 50,
    },
    icon: {},
    text: {
        height: 50,
        width: 'auto',
        verticalAlign: 'middle',
    },
}));

function Icon({ color = '#fff', className: externalClassName }) {
    const classes = useStyles();

    return (
        <LogoIcon className={clsx(classes.icon, externalClassName)} style={{ fill: color }} />
    );
}

function Text({ color = '#fff', className: externalClassName }) {
    const classes = useStyles();

    return (
        <LogoText className={clsx(classes.text, externalClassName)} style={{ fill: color }} />
    );
}

function Logo({ color = '#fff' }) {
    const classes = useStyles();

    return (
        <div>
            <Icon color={color} className={classes.fullIcon} />
            <Text color={color} />
        </div>
    );
}

export default Logo;

export {
    Icon,
    Text,
};
