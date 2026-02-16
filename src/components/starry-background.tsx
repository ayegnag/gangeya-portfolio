import React, { useRef, useEffect, ReactNode } from 'react';

interface StarryBackgroundProps {
  className?: string;
  children?: ReactNode;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ className = '', children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let animationFrameId: number;
    const density: number = 10 / 10000; // stars per pixel area
    const maxSpeed: number = 5;
    const acc: number = 0.01;
    const dec: number = 0.02;
    const hoverDelay: number = 800; // ms delay before accelerating
    let currentSpeed: number = 0;
    let isHovering: boolean = false;
    let hoverStartTime: number = 0;
    const stars: Star[] = [];

    class Star {
      x: number;
      y: number;
      opacity: number;
      fadeSpeed: number;
      fadeDirection: number;
      streakLength: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.opacity = Math.random();
        this.fadeSpeed = Math.random() * 0.01 + 0.005;
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
        this.streakLength = Math.floor(Math.random() * 4) + 5; // 5-8
      }

      update(width: number, speed: number): void {
        // Twinkle always, regardless of movement
        this.opacity += this.fadeDirection * this.fadeSpeed;
        if (this.opacity > 1) {
          this.opacity = 1;
          this.fadeDirection = -1;
        } else if (this.opacity < 0) {
          this.opacity = 0;
          this.fadeDirection = 1;
        }

        // Move left
        if (speed > 0) {
          this.x -= speed;
          if (this.x < -this.streakLength) { // Adjust wrap to account for streak length
            this.x += width + this.streakLength;
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, width: number, speed: number): void {
        const alpha = this.opacity;
        if (speed < 0.1) {
          // Draw pixel dot
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillRect(Math.floor(this.x), Math.floor(this.y), 1, 1);
        } else {
          // Draw horizontal line streak
          const length = this.streakLength * Math.min(1, speed / maxSpeed);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.lineCap = 'round'; // For smoother lines

          let x = this.x;
          let y = this.y;

          // Handle wrapping
          while (x < 0) {
            x += width;
          }

          if (x + length > width) {
            // Draw first part
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(width, y);
            ctx.stroke();

            // Draw wrapped part
            const remaining = length - (width - x);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(remaining, y);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + length, y);
            ctx.stroke();
          }
        }
      }
    }

    const init = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      const numStars = Math.floor(width * height * density);
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star(width, height));
      }
    };

    init();

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (isHovering) {
        if (Date.now() - hoverStartTime > hoverDelay) {
          if (currentSpeed < maxSpeed) {
            currentSpeed += acc;
            if (currentSpeed > maxSpeed) currentSpeed = maxSpeed;
          }
        }
      } else {
        if (currentSpeed > 0) {
          currentSpeed -= dec;
          if (currentSpeed < 0) currentSpeed = 0;
        }
      }

      stars.forEach(star => {
        star.update(width, currentSpeed);
        star.draw(ctx, width, currentSpeed);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseEnter = () => {
      isHovering = true;
      hoverStartTime = Date.now();
    };

    const handleMouseLeave = () => {
      isHovering = false;
      // Deceleration immediate, no change needed
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    const resizeObserver = new ResizeObserver(() => {
      init();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      {children}
    </div>
  );
};

export default StarryBackground;