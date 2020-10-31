import Logo from '@/ui-components/Logo/Animated.jsx';
import UI from '../core/UI.js';

function Preloader({ onLoad, invert = false }) {
    this.render = UI('preloader')
        .append(
            Logo({
                onLoad: () => {
                    this.isLoad = true;
                    onLoad();
                },
                isBlueFill: invert,
            }),
        );

    this.isLoad = false;

    if (invert) this.render.className('preloader-invert');
}

export default (props) => new Preloader(props);
