import React, { useEffect, useRef } from 'react';

const BinaryRain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight; // Only first viewport
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Binary rain configuration
        const baseFontSize = 20;
        const columns = Math.floor(canvas.width / baseFontSize);
        const drops: number[] = Array(columns).fill(1);
        const chars = '01'; // Binary characters

        // Animation function
        const draw = () => {
            // Semi-transparent black background for trail effect
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < drops.length; i++) {
                // Random binary character
                const char = chars[Math.floor(Math.random() * chars.length)];

                // Random size variation (80% to 140% of base size)
                const sizeVariation = 0.8 + Math.random() * 0.6;
                const currentFontSize = baseFontSize * sizeVariation;
                ctx.font = `${currentFontSize}px JetBrains Mono, monospace`;

                // Random brightness variation (0.6 to 1.0)
                const brightness = 0.6 + Math.random() * 0.4;

                // Create gradient effect - much brighter
                const y = drops[i] * baseFontSize;
                const gradient = ctx.createLinearGradient(0, y - baseFontSize * 10, 0, y);
                gradient.addColorStop(0, `rgba(13, 242, 13, 0)`);
                gradient.addColorStop(0.5, `rgba(13, 242, 13, ${0.5 * brightness})`);
                gradient.addColorStop(1, `rgba(13, 242, 13, ${brightness})`);

                ctx.fillStyle = gradient;

                // Add glow effect for brighter characters
                if (brightness > 0.8) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = 'rgba(13, 242, 13, 0.8)';
                } else {
                    ctx.shadowBlur = 0;
                }

                // Draw the character
                const x = i * baseFontSize;
                ctx.fillText(char, x, y);

                // Reset drop to top randomly or move down
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            // Reset shadow
            ctx.shadowBlur = 0;
        };

        // Animation loop
        const interval = setInterval(draw, 50);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full pointer-events-none opacity-70 z-0"
            style={{
                background: 'transparent',
                height: '100vh',
                maxHeight: '100vh'
            }}
        />
    );
};

export default BinaryRain;
