import UI from '../core/UI.js';
import { useState, observer } from '../utils/Store.js';
import { getSafeValue as LOC } from '../utils/Locale.js';
import { redirect } from '../utils/Route.js';

import { ArrowBack as ArrowBackIcon, Mail as MailIcon } from '../core/Icons.js';
import Link from '../components/custom/Link.js';
import PrettyLink from '../components/custom/PrettyLink.js';
import Logo from '@/ui-components/Logo/Animated.jsx';

function Contacts() {
    this.render = UI('contacts');

    const body = UI().className('body').insert(this.render);

    UI('h1').text('Danilkinkin').insert(body);

    const links = [
        {
            label: 'Hello@danilkinkin.com',
            link: 'mailto:hello@danilkinkin.com',
            newTab: false,
            icon: MailIcon,
        },
        {
            label: LOC('hh'),
            link: 'https://hh.ru/applicant/resumes/view?resume=06760663ff05853e470039ed1f414d56723455',
        },
        {
            label: LOC('github'),
            link: 'https://github.com/Danilkinkin',
        },
        {
            label: LOC('vk'),
            link: 'https://vk.com/danilkinkin',
        },
        {
            label: LOC('telegram'),
            link: 'https://t.me/Danilkinkin',
        },
        {
            label: LOC('instagram'),
            link: 'https://www.instagram.com/danilkinkin',
        },
        {
            label: LOC('pikabu'),
            link: 'https://pikabu.ru/@Danilkinkin',
        },
    ].map((link) => PrettyLink({
        newTab: true,
        ...link,
    }));

    body.append(links);

    PrettyLink({
        content: [ArrowBackIcon({ size: 24 }), UI('span').text(LOC('to_the_main'))],
        onClick: () => redirect('/'),
    }).render.className().add('home-link').insert(body);

    let logo;

    this.open = () => {
        if (logo) logo.destroy();

        logo = Logo({ size: Math.min(document.body.clientHeight, document.body.clientWidth) * 1.3 }).render.className('big-logo').insert(body);
    };
}

export default () => new Contacts();
