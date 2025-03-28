import React, { useEffect, useRef } from 'react';

const SparklingBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star class
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = 1;
        this.speed = 0.5;
        this.brightness = Math.random();
      }

      update() {
        this.z = this.z - this.speed;
        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        let x = this.x * (1000 / this.z);
        let y = this.y * (1000 / this.z);
        let radius = this.size * (1000 / this.z);
        let opacity = (1 - this.z / 1000) * this.brightness;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    }

    // Meteor class
    class Meteor {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.length = Math.random() * 80 + 20;
        this.speed = Math.random() * 15 + 5;
        this.angle = Math.PI / 4 + (Math.random() * Math.PI / 4);
        this.opacity = 1;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.01;

        if (this.y > canvas.height + 20 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x + Math.cos(this.angle) * this.length,
          this.y + Math.sin(this.angle) * this.length
        );

        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x + Math.cos(this.angle) * this.length,
          this.y + Math.sin(this.angle) * this.length
        );
        ctx.stroke();
      }
    }

    // Create stars and meteors
    const stars = Array.from({ length: 200 }, () => new Star());
    const meteors = Array.from({ length: 5 }, () => new Meteor());

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      meteors.forEach(meteor => {
        meteor.update();
        meteor.draw();
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: '#000000',
      }}
    />
  );
};

export default SparklingBackground; 