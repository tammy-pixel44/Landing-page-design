"use client";

import { useEffect, useState } from "react";

const MINIMUM_LOADER_MS = 900;
const EXIT_MS = 460;

export default function SiteLoader() {
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    document.body.dataset.cardeifyLoading = "true";

    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      window.addEventListener("load", () => resolve(), { once: true });
    });

    const fontsReady = document.fonts?.ready?.then(() => undefined).catch(() => undefined) ?? Promise.resolve();

    Promise.all([pageReady, fontsReady]).then(() => {
      const elapsed = performance.now() - startedAt;
      window.setTimeout(() => {
        setLeaving(true);
        window.setTimeout(() => {
          delete document.body.dataset.cardeifyLoading;
          setMounted(false);
          window.dispatchEvent(new CustomEvent("cardeify:ready"));
        }, EXIT_MS);
      }, Math.max(0, MINIMUM_LOADER_MS - elapsed));
    });

    return () => {
      delete document.body.dataset.cardeifyLoading;
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={`cardeify-loader${leaving ? " is-leaving" : ""}`} role="status" aria-live="polite" aria-label="Loading Cardeify">
      <div className="cardeify-loader__mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="cardeify-loader__brand">Cardeify</div>
      <p>Preparing your wallet</p>
      <div className="cardeify-loader__track" aria-hidden="true"><i /></div>
    </div>
  );
}
