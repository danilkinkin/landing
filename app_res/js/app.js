import { setLocale, getValue as LOC} from "./utils/Locale.js";

import UI from "./core/UI.js";

import Home from "./pages/Home.js";

setLocale("RU");

UI(document.body)
	.append(Home())