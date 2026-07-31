"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (dataUrl: string) => void;
  clearLabel: string;
};

export function SignaturePad({ value, onChange, clearLabel }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const dirty = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const prev = dirty.current ? canvas.toDataURL("image/png") : "";
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#2c2925";
      if (prev && prev !== "data:,") {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
        img.src = prev;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!value && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      dirty.current = false;
    }
  }, [value]);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    drawing.current = true;
    dirty.current = true;
    canvas?.setPointerCapture(e.pointerId);
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function onMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  function commit() {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = canvasRef.current;
    // JPEG is much smaller than PNG for draft/state — less main-thread cost
    if (canvas) onChange(canvas.toDataURL("image/jpeg", 0.72));
  }

  function clear() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dirty.current = false;
    onChange("");
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="h-40 w-full touch-none rounded-xl border border-[var(--border-soft)] bg-white"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={commit}
        onPointerCancel={commit}
      />
      <button
        type="button"
        onClick={clear}
        className="mt-3 text-sm tracking-[0.08em] text-olive uppercase"
      >
        {clearLabel}
      </button>
    </div>
  );
}
