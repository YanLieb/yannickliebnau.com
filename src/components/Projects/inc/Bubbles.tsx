import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";
import p5 from "p5";

type Props = PropsWithChildren<{
  fade?: number;        // 30 - opacidad del "borrado"
  strokeGray?: number;  // 200 - gris del trazo
  bg?: number;          // 255 - color de fondo inicial
  className?: string;   // clases para el contenedor
  style?: React.CSSProperties;
}>;

/**
 * Envuelve tu slide: dibuja burbujas detrás SIN bloquear el contenido.
 * Se ajusta al tamaño del contenedor con ResizeObserver.
 */
export default function BubblesInContainer({
  children,
  fade = 30,
  strokeGray = 200,
  bg = 255,
  className,
  style,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const p5Ref = useRef<p5 | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sketch = (p: p5) => {
      type Bubble = {
        x: number;
        y: number;
        radius: number;
        alpha: number;
        speed: number;
        update: () => void;
        display: () => void;
        isDead: () => boolean;
      };

      // eslint-disable-next-line prefer-const
      let bubbles: Bubble[] = [];
      let isSetupComplete = false; // Flag pour savoir si setup est terminé

      const createBubble = (x: number, y: number): Bubble => ({
        x,
        y,
        radius: p.random(500),
        alpha: 12,
        speed: p.random(0.5, 1.5),

        update() {
          this.radius += this.speed;
          this.alpha *= 0.99;
        },

        display() {
          p.noFill();
          p.stroke(strokeGray, this.alpha);
          p.strokeWeight(3);
          p.ellipse(this.x, this.y, this.radius, this.radius);
        },

        isDead() {
          return this.alpha < 10;
        }
      });

      const sizeToContainer = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        p.resizeCanvas(w, h);
      };

      p.setup = () => {
        const c = p.createCanvas(container.clientWidth, container.clientHeight);
        c.parent(container);
        // canvas debajo del contenido - accès au DOM element
        const canvasEl = c.elt as HTMLCanvasElement;
        canvasEl.style.position = "absolute";
        canvasEl.style.inset = "0";
        canvasEl.style.zIndex = "1";
        canvasEl.style.pointerEvents = "none";
        p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
        p.background(bg);
        p.noStroke();

        // Marquer setup comme terminé
        isSetupComplete = true;
      };

      p.draw = () => {
        if (!isSetupComplete) return; // Attendre que setup soit terminé

        p.fill(bg, fade);
        p.noStroke();
        p.rect(0, 0, p.width, p.height);

        // actualiza/dibuja burbujas
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const b = bubbles[i];
          b.update();
          b.display();
          if (b.isDead()) {
            bubbles.splice(i, 1);
          }
        }

        // Reset stroke après avoir dessiné toutes les bulles
        p.noStroke();
      };

      p.mouseMoved = () => {

        if (!isSetupComplete || !p.width || !p.height) return;

        if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
          if (p.frameCount % 5 === 0) {
            for (let i = 0; i < 3; i++) {
              const offsetX = p.random(-1, 1);
              const offsetY = p.random(-1, 1);
              bubbles.push(createBubble(p.mouseX + offsetX, p.mouseY + offsetY));
            }
          }
        }
      };

      // Resize del contenedor
      const ro = new ResizeObserver(() => sizeToContainer());
      ro.observe(container);

      // Store cleanup function
      const cleanupFn = () => {
        ro.disconnect();
      };

      // Store cleanup reference on p5 instance
      Object.defineProperty(p, '_cleanup', {
        value: cleanupFn,
        configurable: true
      });
    };

    p5Ref.current = new p5(sketch);

    return () => {
      // Cleanup custom function if exists
      const p5Instance = p5Ref.current as p5 & { _cleanup?: () => void };
      if (p5Instance?._cleanup) {
        p5Instance._cleanup();
      }
      p5Ref.current?.remove();
      p5Ref.current = null;
    };
  }, [fade, strokeGray, bg]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative", // importante para posicionar el canvas
        ...style,
      }}
    >
      {/* tu contenido va por encima */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
