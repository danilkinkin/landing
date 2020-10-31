import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LogoText from '@/images/logo_text.svg';
import LogoIcon from '@/images/logo_icon.svg';

const useStyles = makeStyles((theme) => ({
    icon: {
        fill: theme.palette.common.white,
        height: 'auto',
        width: 50,
        verticalAlign: 'middle',
        marginRight: 16,
        marginLeft: -66,
    },
    text: {
        fill: theme.palette.common.white,
        height: 50,
        width: 'auto',
        verticalAlign: 'middle',
    },
}));

function Logo() {
    const classes = useStyles();

    return (
        <div>
            <LogoIcon className={classes.icon} />
            <LogoText className={classes.text} />
        </div>
    );
}

export default Logo;
