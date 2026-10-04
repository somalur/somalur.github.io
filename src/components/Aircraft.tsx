// An original overhead aircraft silhouette, positioned on the globe by CareerGlobe.
export default function Aircraft() {
  return (
    <g data-aircraft visibility="hidden" aria-hidden="true" pointerEvents="none">
      <path d="M0-15 C2-15 3-12 3-8 L3-3 15 5 15 8 3 4 3 10 7 13 7 15 0 13-7 15-7 13-3 10-3 4-15 8-15 5-3-3-3-8 C-3-12-2-15 0-15Z"
        fill="#fff" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M0-9V9" stroke="#777" strokeWidth="0.8" />
    </g>
  );
}
