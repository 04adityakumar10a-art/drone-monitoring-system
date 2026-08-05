import { useEffect, useRef, useState } from "react";

export default function useReplay(history) {

    const [telemetry, setTelemetry] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);

    const index = useRef(0);

    useEffect(() => {

        if (!playing) return;
        if (history.length === 0) return;

        const timer = setInterval(() => {

            if (index.current >= history.length) {

                clearInterval(timer);

                index.current = history.length - 1;

                setCurrentIndex(index.current);

                setTelemetry(history[index.current]);

                setPlaying(false);

                return;
            }

            setTelemetry(history[index.current]);

            setCurrentIndex(index.current);

            index.current++;

        }, 1000 / speed);

        return () => clearInterval(timer);

    }, [playing, history, speed]);

    function play() {

        if (history.length === 0) return;

        if (index.current >= history.length) {

            index.current = 0;

        }

        setTelemetry(history[index.current]);

        setCurrentIndex(index.current);

        setPlaying(true);

    }

    function pause() {

        setPlaying(false);

    }

    function stop() {

        setPlaying(false);

        index.current = 0;

        setCurrentIndex(0);

        if (history.length > 0) {

            setTelemetry(history[0]);

        }

    }

    function seek(newIndex) {

        if (history.length === 0) return;

        const safeIndex = Math.max(
            0,
            Math.min(newIndex, history.length - 1)
        );

        index.current = safeIndex;

        setCurrentIndex(safeIndex);

        setTelemetry(history[safeIndex]);

    }

    function skipForward(step = 10) {

        seek(index.current + step);

    }

    function skipBackward(step = 10) {

        seek(index.current - step);

    }

    return {

        telemetry,

        playing,

        play,

        pause,

        stop,

        seek,

        skipForward,

        skipBackward,

        speed,

        setSpeed,

        currentIndex,

        totalFrames: history.length

    };

}