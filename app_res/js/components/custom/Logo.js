import UI from '../../core/UI.js';

function Logo({ onLoad, isBlueFill = false, size = 245 }) {
    const width = size * (178 / 245);
    const height = size;
    const depth = size * 0.082;

    this.render = UI('canvas')
        .className('icon-canvas')
        .attribute('width', size)
        .attribute('height', height);

    const ctx 	= this.render.html.getContext('2d');
    let time 	= 0;
    const start 	= performance.now();
    let percentload = 0;

    const drawFrame = () => {
        this.render.html.width = this.render.html.width;
        drawCircle(cubic(time));
        if (time > 0.5) { drawLine(cubic(time * 2 - 1)); }
        if (time < 0.92) {
            time += (percentload * 0.01 - time) * 0.06;
            percentload += time * 2 + 0.8;
            requestAnimationFrame(drawFrame);
        } else if (time != 1) {
            time = 1;
            if (onLoad) setTimeout(() => onLoad(), 200);
            requestAnimationFrame(drawFrame);
        }
    };

    function drawCircle(t) {
        ctx.lineWidth = depth;
        ctx.strokeStyle = isBlueFill ? '#0000FF' : '#fff';
        ctx.beginPath();
        ctx.arc(size * 0.5, size * 0.55, size * 0.38 - depth * 0.5, Math.PI * 0.5 * (t - 1), Math.PI * 0.5 * (t * 5 - 1));
        ctx.stroke();
    }

    function drawLine(t) {
        ctx.lineWidth = depth;
        ctx.strokeStyle = isBlueFill ? '#0000FF' : '#fff';
        ctx.beginPath();
        ctx.moveTo(size * 0.24, size - depth * 0.3);
        ctx.lineTo(size * 0.167 * t + size * 0.24, (size - depth * 0.3) * (1 - t) + t * depth * 0.3);
        ctx.stroke();
    }

    function cubic(t, power) {
        if (t < 0.5) return 4 * t * t * t;
        return 4 * (t - 1) * (t - 1) * (t - 1) + 1;
    }

    requestAnimationFrame(drawFrame);
}

export default (props) => new Logo(props);
