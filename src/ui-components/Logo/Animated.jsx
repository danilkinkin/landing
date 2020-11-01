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

function AnimatedLogo(props) {
    const {
        onEnd,
        size = 168,
        className: externalClassName,
        time = 300,
        value = 1,
    } = props;
    const store = useLocalStore(() => ({
        ctx: null,
        start: -1,
        time: 0,
        oldValue: 0,
        currValue: value,
    }));

    const width = size * (129 / 168);
    const height = size;
    const canvasRef = useRef();

    const drawFrame = (now, startTime) => {
        if (store.time === -1 || startTime !== store.start) return;
        // eslint-disable-next-line no-self-assign
        canvasRef.current.width = canvasRef.current.width;

        store.currValue = store.oldValue + (-store.oldValue + value) * Math.min(Math.max(now - store.start, 0) / time, 1);

        drawCircle({
            ctx: store.ctx,
            depth: size * 0.11,
            color: '#000',
            size: width,
            t: cubic(store.currValue),
        });
        if (store.currValue > 0.5) {
            drawLine({
                ctx: store.ctx,
                depth: size * 0.11,
                color: '#000',
                size,
                t: cubic(store.currValue * 2 - 1),
            });
        }

        if (store.currValue === value) {
            onEnd(store.currValue);
            return;
        }

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
        store.oldValue = store.currValue;
        requestAnimationFrame((n) => drawFrame(n, store.start));
    }, [value]);

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
