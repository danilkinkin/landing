import React, { useRef, useEffect } from 'react';
import { useLocalStore } from 'mobx-react';

function drawCircle(props) {
    const {
        ctx,
        depth,
        color,
        size,
        t,
    } = props;
    ctx.lineWidth = depth;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(size * 0.5, size * 0.68, size * 0.49 - depth * 0.5, Math.PI * 0.5 * (t - 1), Math.PI * 0.5 * (t * 5 - 1));
    ctx.stroke();
}

function drawLine(props) {
    const {
        ctx,
        depth,
        color,
        size,
        t,
    } = props;
    ctx.lineWidth = depth;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(size * 0.18, size * 0.985);
    ctx.lineTo(size * 0.18 + size * 0.13 * t, (size * 0.985) * (1 - t) + size * 0.01 * t);
    ctx.stroke();
}

function cubic(t) {
    if (t < 0.5) return 4 * t * t * t;
    return 4 * (t - 1) * (t - 1) * (t - 1) + 1;
}

function AnimatedLogo({ onEnd, size = 168, className: externalClassName }) {
    const store = useLocalStore(() => ({
        ctx: null,
        start: -1,
        time: 0,
        percentload: 0,
    }));

    const width = size * (129 / 168);
    const height = size;
    const canvasRef = useRef();

    const drawFrame = (now, startTime) => {
        if (store.time === -1 || startTime !== store.start) return;
        // eslint-disable-next-line no-self-assign
        canvasRef.current.width = canvasRef.current.width;

        drawCircle({
            ctx: store.ctx,
            depth: size * 0.11,
            color: '#000',
            size: width,
            t: cubic(store.time),
        });
        if (store.time > 0.5) {
            drawLine({
                ctx: store.ctx,
                depth: size * 0.11,
                color: '#000',
                size,
                t: cubic(store.time * 2 - 1),
            });
        }
        if (store.time < 0.92) {
            store.time += (store.percentload * 0.01 - store.time) * 0.06;
            store.percentload += store.time * 2 + 0.8;
            requestAnimationFrame((n) => drawFrame(n, startTime));
        } else if (store.time !== 1) {
            store.time = 1;
            if (onEnd) setTimeout(() => onEnd(), 200);
            requestAnimationFrame((n) => drawFrame(n, startTime));
        }
    };

    useEffect(() => {
        store.ctx = canvasRef.current.getContext('2d');
        store.start = typeof window !== 'undefined' ? window.performance.now() : -1;
        store.time = 0;
        store.percentload = 0;
        requestAnimationFrame((n) => drawFrame(n, store.start));

        return () => { store.time = -1; };
    }, []);

    return (
        <canvas
            height={height}
            width={width}
            ref={canvasRef}
            className={externalClassName}
        >
            loading...
        </canvas>
    );
}

export default AnimatedLogo;
