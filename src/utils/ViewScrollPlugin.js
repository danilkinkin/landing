import { ScrollbarPlugin } from 'smooth-scrollbar';

class ViewScrollPlugin extends ScrollbarPlugin {
    static pluginName = 'viewScrollPlugin';

    static defaultOptions = {
        breakpoints: [],
        onBreakpoint: () => {},
        detectOffset: 100,
    };

    _speed = 0;
    _remain = 0;
    _direction = 'none';
    _reverseBreakpoints = [];
    _breakpoints = [];
    _breakpointAim = null;
    _breakpointCurrent = null;
    _scrollToTimeout = null;

    onInit() {
        this._breakpoints = [...this.options.breakpoints].map((breakpoint, index) => ({
            id: breakpoint?.id || `breakpoint-${index}`,
            value: typeof breakpoint === 'number' ? breakpoint : breakpoint.value,
            block: breakpoint?.block || false,
        }));
        this._reverseBreakpoints = [...this._breakpoints].reverse();

        this._breakpointAim = this._reverseBreakpoints.find((breakpoint) => (
            this.scrollbar.offset.y >= breakpoint.value - this.options.detectOffset
        ));
    }

    onRender(remainMomentum) {
        this._speed = Math.abs(remainMomentum.y - this._remain);

        if (remainMomentum.y < 0) {
            this._direction = 'up';
        } else if (remainMomentum.y > 0) {
            this._direction = 'down';
        } else {
            this._direction = 'none';
        }

        this._remain = remainMomentum.y;

        if (this._direction === 'up') {
            this._breakpointAim = this._reverseBreakpoints.find((breakpoint) => (
                this.scrollbar.offset.y >= breakpoint.value - this.options.detectOffset
            ));
        } else if (this._direction === 'down') {
            this._breakpointAim = this._breakpoints.find((breakpoint) => (
                this.scrollbar.offset.y <= breakpoint.value + this.options.detectOffset
            ));
        }

        if (this._breakpointCurrent?.value !== this._breakpointAim?.value) {
            this._breakpointCurrent = { ...this._breakpointAim };
            this.options.onBreakpoint(this._breakpointAim);
        }

        if (
            this._speed === 0
            && (
                (
                    this.scrollbar.offset.y !== this._breakpointAim?.value
                    && this._breakpointAim?.block
                )
                || (
                    this.scrollbar.offset.y < this._breakpointAim?.value
                    && !this._breakpointAim?.block
                )
            )
            && this._scrollToTimeout === null
        ) {
            clearTimeout(this._scrollToTimeout);
            this._scrollToTimeout = setTimeout(() => {
                this.scrollbar.scrollTo(0, this._breakpointAim?.value, 700, {
                    easing: (t) => {
                        t *= 2;
                        if (t < 1) return 0.5 * t * t * t * t;
                        t -= 2;
                        return -0.5 * (t * t * t * t - 2);
                    },
                    callback: () => { this._scrollToTimeout = null; },
                });
            }, 200);
        }
    }
}

export default ViewScrollPlugin;
