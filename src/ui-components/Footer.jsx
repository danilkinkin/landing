import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    Box, Container, Link, Tooltip, Typography,
} from '@material-ui/core';
import LogoIcon from '@/resources/logo_studio.svg';
import { useTranslation } from 'react-i18next';
import { OpenInNewRounded as OpenInNewIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: 320,
        width: '100%',
        backgroundColor: theme.palette.background.default,
        marginTop: 'auto',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    links: {
        width: '100%',
        flexGrow: 1,
        display: 'flex',
    },
    designedByBlock: {
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: theme.spacing(2),
    },
    designedByLabel: {
        maxHeight: 100,
        marginBottom: theme.spacing(1),
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2),
        transition: theme.transitions.create(['transform'], {
            duration: theme.transitions.duration.extra,
            easing: theme.transitions.easing.extraEaseInOut,
        }),
    },
    designerLink: {
        display: 'flex',
        padding: theme.spacing(0.5, 2),
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        '& > *': { zIndex: 1 },
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: 0,
            zIndex: 0,
            backgroundColor: '#51efff',
            transition: theme.transitions.create(['width'], {
                duration: theme.transitions.duration.extra,
                easing: theme.transitions.easing.extraEaseInOut,
            }),
        },
        '&:hover::after': { width: `calc(100% + ${theme.spacing(6)}px)` },
    },
    linkWrapper: {
        '&:hover + $designedByLabel': { transform: `translateY(${theme.spacing(1)}px)` },
        '&:hover $openInNewIcon': { opacity: 1 },
    },
    openInNewIcon: {
        position: 'absolute',
        right: theme.spacing(-3),
        color: fade(theme.palette.common.black, 0.5),
        pointerEvents: 'none',
        opacity: 0,
        transition: theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.extra,
            easing: theme.transitions.easing.extraEaseInOut,
        }),
    },
    linksBlock: {
        display: 'flex',
        flexDirection: 'column',
        width: 260,
        paddingTop: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    linksBlockTitle: { marginBottom: theme.spacing(2) },
    linksBlockLink: { marginTop: theme.spacing(1) },
}));

function Block({ title, links }) {
    const classes = useStyles();

    return (
        <Box className={classes.linksBlock}>
            <Typography variant="h5" className={classes.linksBlockTitle}>{title}</Typography>
            {links.map(({ label, url, ...other }) => (
                <Link
                    href={url}
                    key={url}
                    className={classes.linksBlockLink}
                    color="textSecondary"
                    {...other}
                >
                    {label}
                </Link>
            ))}
        </Box>
    );
}

function Footer() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Box className={classes.root}>
            <Container className={classes.container}>
                <Box className={classes.links}>
                    <Block
                        title={t('footer.links.review.title')}
                        links={[
                            {
                                label: t('footer.links.review.writeReview'),
                                url: '/review',
                            },
                            {
                                label: t('footer.links.review.reportBug'),
                                url: '/bug-report',
                            },
                            {
                                label: t('footer.links.review.githubIssue'),
                                url: 'https://github.com/rigami-org/readme/issues',
                                target: '_blank',
                            },
                        ]}
                    />
                    <Block
                        title={t('footer.links.other.title')}
                        links={[
                            {
                                label: t('footer.links.other.privacyPolicy'),
                                url: 'https://github.com/rigami-org/readme/blob/main/POLICY.md',
                                target: '_blank',
                            },
                            {
                                label: t('footer.links.other.github'),
                                url: 'https://github.com/rigami-org/readme',
                                target: '_blank',
                            },
                        ]}
                    />
                </Box>
                <Box className={classes.designedByBlock}>
                    <Tooltip
                        title={t('footer.linkDesignerTooltip')}
                        enterDelay={400}
                        enterNextDelay={400}
                    >
                        <a href="https://danilkinkin.com/" target="_blank" className={classes.linkWrapper}>
                            <Box className={classes.designerLink}>
                                <LogoIcon />
                                <OpenInNewIcon className={classes.openInNewIcon} />
                            </Box>
                        </a>
                    </Tooltip>
                    <Typography variant="body2" className={classes.designedByLabel}>
                        {t('footer.design&development')}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
