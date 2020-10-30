import RU from '../../lang/RU.js';
import EN from '../../lang/EN.js';

let locale;

export const setLocale = (newLocale) => {
    switch (newLocale.toUpperCase()) {
    case 'RU':
        locale = RU;
        break;
    case 'EN':
        locale = EN;
        break;
    default:
        locale = EN;
        // throw new Error(`Unknown locale [${newLocale}]`)
        break;
    }
};

export const getValue = (key) => (typeof locale[key] === 'function' ? locale[key](arguments) : locale[key]);

export const getSafeValue = (key, ...param) => {
    if (!locale[key]) return key;

    return typeof locale[key] === 'function' ? locale[key](...param) : locale[key];
};
