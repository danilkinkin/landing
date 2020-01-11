import RU from "../../lang/RU.js";

let locale = RU;

export const setLocale = (newLocale) => {
	switch (newLocale.toUpperCase()) {
		case "RU":
			locale = RU;
			break;
		default:
			throw new Error(`Unknown locale [${newLocale}]`)
			break;
	}
};

export const getValue = (key) => locale[key];

export const getSafeValue = (key) => locale[key] || key;