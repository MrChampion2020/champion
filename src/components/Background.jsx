import React, { useState, useEffect } from 'react';

const moveLight = {
  keyframes: `
    0% {
      textStrokeDashoffset: 0;
    }
    100% {
      textStrokeDashoffset: 1000;
    }
  `,
};

const Background = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOffset((prevOffset) => prevOffset + 1);
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        zIndex: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <h1
        style={{
          fontSize: '80px',
          fontWeight: '800',
          color: 'transparent',
          textStrokeColor: 'rgba(236, 239, 241, 0.16)',
          textStrokeWidth: '2px',
          textStrokeDasharray: '10',
          textStrokeDashoffset: offset,
          animationName: moveLight.keyframes,
          animationDuration: '10s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          opacity: 0.55,
          WebkitTextFillColor: 'transparent',
          WebkitTextStroke: '2px rgba(236, 239, 241, 0.16)',
        }}
      >
        Champion
      </h1>
    </div>
  );
};

export default Background;
