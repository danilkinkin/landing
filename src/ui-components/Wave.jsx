import React, { useRef, useEffect } from 'react';
import { useLocalStore } from 'mobx-react';

function drawWave(props) {
    const {
        ctx,
        color,
        width,
        height,
        size,
    } = props;
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, 0, width * 0.5, height * 2 * size, width, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.fill();
}

function cubic(t) {
    if (t < 0.5) return 4 * t * t * t;
    return 4 * (t - 1) * (t - 1) * (t - 1) + 1;
}

function AnimatedLogo(props) {
    const {
        className: externalClassName,
        width = 200,
        height = 200,
        size = 0,
        color = '#000',
        time = 300,
    } = props;

    const store = useLocalStore(() => ({
        ctx: null,
        size,
        oldSize: 0,
        currSize: size,
        start: 0,
        nowTime: 0,
        time: 0,
    }));
    const canvasRef = useRef();

    const drawFrame = (now, startTime) => {
        if (store.time === -1 || !canvasRef.current || startTime !== store.start) return;
        // eslint-disable-next-line no-self-assign
        canvasRef.current.width = canvasRef.current.width;

        store.currSize = store.oldSize + (-store.oldSize + size) * Math.min(Math.max(now - store.start, 0) / time, 1);

        drawWave({
            ctx: store.ctx,
            color,
            width,
            height,
            size: cubic(store.currSize),
        });

        if (store.currSize === size) return;

        requestAnimationFrame((n) => drawFrame(n, startTime));
    };

    useEffect(() => {
        store.ctx = canvasRef.current.getContext('2d');

        return () => {
            store.start = -1;
        };
    }, []);

    useEffect(() => {
        store.start = typeof window !== 'undefined' ? window.performance.now() : -1;
        store.oldSize = store.currSize;
        requestAnimationFrame((n) => drawFrame(n, store.start));
    }, [size]);

    return (
        <canvas
            height={height}
            width={width}
            ref={canvasRef}
            className={externalClassName}
        />
    );
}

export default AnimatedLogo;
