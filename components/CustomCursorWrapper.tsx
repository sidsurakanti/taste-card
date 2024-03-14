"use client";

import { useState } from "react";

export function Cursor({ children }: { children: React.ReactNode }) {
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const moveCursor = (e: React.MouseEvent) => {
    const { pageX, pageY } = e;
    const mouseX = pageX - 8;
    const mouseY = pageY - 8;
    setCursor({ x: mouseX, y: mouseY });
  };

  return (
    <main onMouseMove={moveCursor} className="h-[inherit] w-[inherit]">
      <div
        id="cursor"
        className="h-8 w-8 bg-white/90 rounded-[50%]"
        style={{
          position: "absolute",
          top: cursor.y,
          left: cursor.x,
          zIndex: 1000,
          pointerEvents: "none",
        }}
      />
      {children}
    </main>
  );
}
