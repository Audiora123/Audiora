
import { useEffect, useRef } from 'react';

const AudioVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
    
    const bars = 80;
    const barWidth = canvas.width / bars;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < bars; i++) {
        // Generate random height for bars to simulate audio visualization
        // In a real implementation, this would use audio data
        const height = Math.random() * canvas.height * 0.6;
        
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#9b87f5');
        gradient.addColorStop(1, '#D946EF');
        
        ctx.fillStyle = gradient;
        
        const x = i * barWidth + barWidth * 0.5;
        const y = canvas.height - height;
        
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth * 0.6, height, 4);
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full"
    />
  );
};

export default AudioVisualizer;
