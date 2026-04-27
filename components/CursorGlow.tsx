"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          width: 280,
          height: 280,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(129,166,198,0.25) 0%, rgba(170,205,220,0.15) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Inner glow core */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 120,
          height: 120,
          transform: "translate(-50%, -50%)",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(243,227,208,0.35) 0%, rgba(129,166,198,0.15) 60%, transparent 80%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}