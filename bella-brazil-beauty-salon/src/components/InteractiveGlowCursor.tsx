import React, { useEffect, useRef, useState } from 'react';

export const InteractiveGlowCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hasPointer, setHasPointer] = useState(false);
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    setHasPointer(true);

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        isHoveringRef.current = true;
      } else {
        isHoveringRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;

    // 120fps smooth lerp loop
    const updateCursor = () => {
      const pos = posRef.current;
      // High refresh interpolation
      pos.x += (pos.targetX - pos.x) * 0.18;
      pos.y += (pos.targetY - pos.y) * 0.18;

      if (cursorRef.current) {
        const scale = isHoveringRef.current ? 1.6 : 1;
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        cursorRef.current.style.opacity = isHoveringRef.current ? '0.75' : '0.45';
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!hasPointer) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-40 transition-transform duration-75 ease-out"
      style={{
        width: '420px',
        height: '420px',
        background: 'radial-gradient(circle, rgba(181, 154, 98, 0.18) 0%, rgba(29, 74, 53, 0.12) 40%, rgba(11, 33, 24, 0) 70%)',
        filter: 'blur(20px)',
        willChange: 'transform, opacity',
        borderRadius: '50%'
      }}
    />
  );
};
