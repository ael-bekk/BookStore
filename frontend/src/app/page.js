"use client";
import { useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import io from 'socket.io-client';

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState('#f11946');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const socket = io('http://localhost:3003');

      socket.on('percentage', data => {
        // Set color dynamically based on progress
        if (parseInt(data.toFixed(2)) > 0 && parseInt(data.toFixed(2)) < 50) {
          setColor('#f11946');
        } else if (parseInt(data.toFixed(2)) >= 50 && parseInt(data.toFixed(2)) < 75) { 
          setColor('#f1a619');
        } else if (parseInt(data.toFixed(2)) === 100) { 
          setColor('#19f1a6');
        } 
        setProgress(parseInt(data.toFixed(2)));
      });

      return () => {
        socket.disconnect(); // Cleanup when component unmounts
      };
    }
  }, []);

  const handleDownload = () => {
    const socket = io('http://localhost:3003');

    socket.emit('downloadBook', (r) => {
      console.log('WebSocket connection established', r);
    });

    socket.on('percentage', data => {
      if (parseInt(data.toFixed(2)) > 0 && parseInt(data.toFixed(2)) < 50) {
        setColor('#f11946');
      } else if (parseInt(data.toFixed(2)) >= 50 && parseInt(data.toFixed(2)) < 75) { 
        setColor('#f1a619');
      } else if (parseInt(data.toFixed(2)) === 100) { 
        setColor('#19f1a6');
      } 
      setProgress(parseInt(data.toFixed(2)));
    });
  };

  return (
    <div>
      <h1>File Download Progress</h1>
      <ProgressBar completed={progress} transitionDuration={1} bgColor={color} height="50px" width='700px'/>
      {!progress && <button onClick={handleDownload}>Download</button>}
      {progress === 100 && <div>Download complete</div>}
    </div>
  );
}
