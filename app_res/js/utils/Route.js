const routes = {};

export const route = (paths, action) => {
    if (paths.forEach) {
        paths.forEach((path) => routes[path] = action);
    } else {
        routes[paths] = action;
    }
    checkRoute();
};

export const redirect = (path, state) => {
    window.history.pushState({ ...state }, '', path);
    checkRoute();
};

export const check = () => checkRoute();

window.onpopstate = checkRoute;

function checkRoute() {
    const r = routes[window.location.pathname];

    if (routes[window.location.pathname]) {
        routes[window.location.pathname]();
    } else if (routes['404']) routes['404']();
}
