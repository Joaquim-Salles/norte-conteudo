import React from 'react';
import {Img} from 'remotion';
import {MonitorFrameProps} from './types';

/**
 * Moldura de monitor — para apresentar telas desktop como produto, sem
 * confundir a composição com uma captura de navegador.
 */
export const MonitorFrame: React.FC<MonitorFrameProps> = ({screenshot, width, sourceWidth = 1910, sourceHeight = 984}) => {
  const bezel = width * 0.026;
  const aspect = sourceWidth / sourceHeight;
  const screenWidth = width - bezel * 2;
  const screenHeight = screenWidth / aspect;
  const frameHeight = screenHeight + bezel * 2;
  const standHeight = width * 0.115;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height: frameHeight + standHeight,
        transform: 'perspective(2200px) rotateY(-12deg)',
        transformOrigin: '50% 50%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: 0,
          left: '50%',
          bottom: 0,
          width: width * 0.28,
          height: width * 0.035,
          transform: 'translateX(-50%)',
          borderRadius: 999,
          background: '#242529',
          boxShadow: '0 10px 18px rgba(10,10,10,0.14)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          zIndex: 0,
          left: '50%',
          bottom: width * 0.025,
          width: width * 0.055,
          height: width * 0.095,
          transform: 'translateX(-50%)',
          background: '#27282c',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width,
          height: frameHeight,
          padding: bezel,
          borderRadius: 14,
          background: '#232428',
          border: '1px solid rgba(10,10,10,0.38)',
          boxShadow: '0 22px 38px rgba(10,10,10,0.18), 0 3px 8px rgba(10,10,10,0.12)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: screenWidth,
            height: screenHeight,
            overflow: 'hidden',
            borderRadius: 5,
            background: '#fff',
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
            bottom: bezel * 0.32,
            left: '50%',
            width: 5,
            height: 5,
            transform: 'translateX(-50%)',
            borderRadius: '50%',
            background: '#7fc7b3',
            boxShadow: '0 0 0 2px rgba(127,199,179,0.12)',
          }}
        />
      </div>
    </div>
  );
};
