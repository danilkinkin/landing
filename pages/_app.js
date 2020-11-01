import React, { Fragment, useEffect } from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@/theme';
import '@/fonts/inject.css';
import Head from 'next/head';
import SmoothScroll from '@/ui-components/SmoothScroll';
import useMainStateStore from '@/utils/mainStateStore';
import SmoothLoad from '@/ui-components/SmoothLoad';

function MyApp({ Component, pageProps }) {
    const { eventBus } = useMainStateStore();

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Danilkinkin</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                {/* Icons */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link
                    rel="icon" type="image/png" sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon" type="image/png" sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0000ff" />
                <meta name="msapplication-TileColor" content="#0000ff" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
                {/* Meta */}
                {/* Primary Meta Tags */}
                <meta name="title" content="Danilkinkin" />
                <meta name="description" content="Hi, I’m Danil Zakhvatkin, I’m developing web applications, websites and other interesting things." />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="./" />
                <meta property="og:title" content="Danilkinkin" />
                <meta property="og:description" content="Hi, I’m Danil Zakhvatkin, I’m developing web applications, websites and other interesting things." />
                <meta property="og:image" content="/large-share-image.png" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="./" />
                <meta property="twitter:title" content="Danilkinkin" />
                <meta property="twitter:description" content="Hi, I’m Danil Zakhvatkin, I’m developing web applications, websites and other interesting things." />
                <meta property="twitter:image" content="/large-share-image.png" />
                <style>
                    {'#__next { overflow: hidden; }'}
                </style>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SmoothLoad>
                    <SmoothScroll onScroll={(scrollOffset) => eventBus.call('document.scroll', scrollOffset)}>
                        <Box
                            style={{
                                minHeight: '100vh',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Component {...pageProps} />
                        </Box>
                    </SmoothScroll>
                </SmoothLoad>
            </ThemeProvider>
        </Fragment>
    );
}

export default MyApp;
