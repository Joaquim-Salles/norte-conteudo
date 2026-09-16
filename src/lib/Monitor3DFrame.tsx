import React from 'react';
import {Img} from 'remotion';
import {MonitorFrameProps} from './types';

/**
 * Monitor com volume visual para apresentar telas desktop sem transformar o
 * slide em um mockup exagerado. A tela continua plana e legível; o volume
 * aparece no corpo, na borda e no suporte.
 */
export const Monitor3DFrame: React.FC<MonitorFrameProps> = ({screenshot, width, sourceWidth = 1910, sourceHeight = 984}) => {
  const bezel = width * 0.026;
  const depth = width * 0.024;
  const aspect = sourceWidth / sourceHeight;
  const screenWidth = width - bezel * 2;
  const screenHeight = screenWidth / aspect;
  const frameHeight = screenHeight + bezel * 2;
  const standHeight = width * 0.115;

  return (
    <div
      style={{
        position: 'relative',
        width: width + depth,
        height: frameHeight + standHeight + depth,
        transform: 'perspective(1900px) rotateY(-14deg) rotateX(1.5deg) rotateZ(-0.4deg)',
        transformOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: 0,
          left: '50%',
          bottom: depth * 0.08,
          width: width * 0.34,
          height: width * 0.04,
          transform: `translateX(-50%) translateX(${depth * 0.42}px)`,
          borderRadius: 999,
          background: 'rgba(24,25,29,0.22)',
          filter: 'blur(5px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          zIndex: 0,
          left: '50%',
          bottom: 0,
          width: width * 0.29,
          height: width * 0.038,
          transform: 'translateX(-50%) translateZ(-10px)',
          borderRadius: 999,
          background: 'linear-gradient(180deg, #3b3d43 0%, #191a1f 55%, #101115 100%)',
          border: '1px solid rgba(8,8,10,0.45)',
          boxShadow: '0 10px 14px rgba(10,10,10,0.18)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          left: '50%',
          bottom: width * 0.025,
          width: width * 0.06,
          height: width * 0.098,
          transform: 'translateX(-50%) translateZ(-8px)',
          borderRadius: '4px 4px 2px 2px',
          background: 'linear-gradient(90deg, #111217 0%, #36383e 48%, #191a1f 100%)',
          border: '1px solid rgba(8,8,10,0.42)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          left: -depth * 0.72,
          top: depth * 0.92,
          width,
          height: frameHeight,
          borderRadius: 19,
          background: 'linear-gradient(145deg, #111217 0%, #25272d 52%, #0e0f13 100%)',
          border: '1px solid rgba(8,8,10,0.5)',
          boxShadow: '0 26px 34px rgba(16,17,20,0.18)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width,
          height: frameHeight,
          padding: bezel,
          borderRadius: 18,
          background: 'linear-gradient(145deg, #3b3d44 0%, #22242a 47%, #111217 100%)',
          border: '1px solid rgba(10,10,12,0.62)',
          boxShadow: '0 22px 36px rgba(10,10,10,0.22), inset 0 1px 0 rgba(255,255,255,0.12)',
          transform: 'translateZ(12px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 5,
            left: width * 0.13,
            right: width * 0.13,
            height: 2,
            borderRadius: 99,
            background: 'rgba(255,255,255,0.11)',
          }}
        />
        <div
          style={{
            position: 'relative',
            width: screenWidth,
            height: screenHeight,
            overflow: 'hidden',
            borderRadius: 6,
            background: '#fff',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.24), 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <Img
            src={screenshot}
            style={{width: screenWidth, height: screenHeight, display: 'block'}}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: bezel * 0.34,
            left: '50%',
            width: 6,
            height: 6,
            transform: 'translateX(-50%)',
            borderRadius: '50%',
            background: '#7fc7b3',
            boxShadow: '0 0 0 2px rgba(127,199,179,0.14), 0 0 8px rgba(127,199,179,0.34)',
          }}
        />
      </div>
    </div>
  );
};
