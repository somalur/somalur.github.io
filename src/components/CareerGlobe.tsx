"use client";

import { useEffect, useId, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "motion/react";
import { geoDistance, geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/land-110m.json";
import styles from "../app/page.module.css";

type Location = { city: string; lat: number; lon: number };
type Coordinate = [number, number];
const topology = world as unknown as Topology<{ land: GeometryCollection }>;
const land = feature(topology, topology.objects.land);
const grid = geoGraticule10();
const projectionAt = ([lon, lat]: Coordinate) => geoOrthographic()
  .translate([300, 218]).scale(166).rotate([-lon, -lat]).clipAngle(90).precision(0.5);

export default function CareerGlobe({ destination, cities, origin }: {
  destination: Location; cities: Location[]; origin: Location;
}) {
  const reduced = useReducedMotion();
  const [zoom, setZoom] = useState(1);
  const zoomed = zoom > 1;
  const zoomRef = useRef(1);
  const id = useId().replace(/:/g, "");
  const svg = useRef<SVGSVGElement>(null);
  const camera = useRef<Coordinate>([destination.lon, destination.lat]);
  const initialProjection = projectionAt([destination.lon, destination.lat]);
  const initialPath = geoPath(initialProjection);

  function changeZoom(value: number) {
    const next = Math.max(1, Math.min(3, value));
    zoomRef.current = next;
    setZoom(next);
  }

  useEffect(() => {
    const element = svg.current;
    if (!element) return;
    const landPath = element.querySelector('[data-land]');
    const gridPath = element.querySelector('[data-grid]');
    const routePath = element.querySelector('[data-route]');
    const markers = element.querySelectorAll<SVGGElement>('[data-city]');
    const destinationCoordinate: Coordinate = [destination.lon, destination.lat];
    const flight = geoInterpolate([origin.lon, origin.lat], destinationCoordinate);
    const rotation = geoInterpolate(camera.current, destinationCoordinate);
    const projection = projectionAt(camera.current);
    const path = geoPath(projection);

    const drawCenter = (center: Coordinate) => {
      camera.current = center;
      projection.rotate([-center[0], -center[1]]);
      landPath?.setAttribute('d', path(land) || '');
      gridPath?.setAttribute('d', path(grid) || '');
      // A great-circle route follows the Earth and clips at the hidden hemisphere.
      routePath?.setAttribute('d', path({ type: 'LineString', coordinates:
        Array.from({ length: 81 }, (_, i) => flight(i / 80)) }) || '');
      markers.forEach((marker, i) => {
        const coordinate: Coordinate = [cities[i].lon, cities[i].lat];
        const position = projection(coordinate);
        marker.setAttribute('visibility', geoDistance(center, coordinate) < Math.PI / 2 && position ? 'visible' : 'hidden');
        if (position) marker.setAttribute('transform', `translate(${position[0].toFixed(3)},${position[1].toFixed(3)})`);
      });
    };
    const draw = (progress: number) => drawCenter(rotation(progress));
    // Start from the current rotation so rapid chapter changes remain smooth.
    const animation = reduced ? undefined : animate(0, 1, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: draw });
    if (reduced) draw(1);
    let drag: { id: number; x: number; y: number; center: Coordinate } | null = null;
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      animation?.stop();
      element.focus({ preventScroll: true });
      element.setPointerCapture(event.pointerId);
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, center: [...camera.current] };
      element.style.cursor = 'grabbing';
    };
    const move = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const sensitivity = 0.4 / zoomRef.current;
      drawCenter([drag.center[0] - (event.clientX - drag.x) * sensitivity,
        Math.max(-85, Math.min(85, drag.center[1] + (event.clientY - drag.y) * sensitivity))]);
    };
    const up = () => { drag = null; element.style.cursor = ''; };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || !event.deltaY) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 300 : 1);
      const next = Math.max(1, Math.min(3, zoomRef.current - delta * 0.003));
      // At the zoom limits, let the visitor continue scrolling the page.
      if (next === zoomRef.current) return;
      event.preventDefault();
      changeZoom(next);
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === '+' || event.key === '=' || event.key === '-') {
        event.preventDefault(); changeZoom(zoomRef.current + (event.key === '-' ? -0.25 : 0.25)); return;
      }
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
      event.preventDefault(); animation?.stop();
      if (event.key === 'Home') { drawCenter(destinationCoordinate); changeZoom(1); return; }
      const [lon, lat] = camera.current;
      drawCenter([lon + (event.key === 'ArrowRight' ? 10 : event.key === 'ArrowLeft' ? -10 : 0),
        Math.max(-85, Math.min(85, lat + (event.key === 'ArrowUp' ? 10 : event.key === 'ArrowDown' ? -10 : 0)))]);
    };
    element.addEventListener('pointerdown', down);
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerup', up);
    element.addEventListener('pointercancel', up);
    element.addEventListener('lostpointercapture', up);
    element.addEventListener('wheel', wheel, { passive: false });
    element.addEventListener('keydown', key);
    return () => {
      animation?.stop(); up();
      element.removeEventListener('pointerdown', down);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerup', up);
      element.removeEventListener('pointercancel', up);
      element.removeEventListener('lostpointercapture', up);
      element.removeEventListener('wheel', wheel);
      element.removeEventListener('keydown', key);
    };
  }, [destination, origin, cities, reduced]);

  return <>
    <div className={styles.globeZoom} role="group" aria-label="Globe zoom">
      <button type="button" aria-pressed={!zoomed} onClick={() => changeZoom(1)}>Full globe</button>
      <button type="button" aria-pressed={zoomed} onClick={() => changeZoom(2)}>Close-up +</button>
    </div>
    <svg ref={svg} className={styles.atlas} viewBox="0 0 600 500" role="img" tabIndex={0}
    aria-label={`Interactive Earth globe. Selected city: ${destination.city}. Drag or use arrow keys to rotate. Scroll or use plus and minus to zoom. Home resets the view.`}>
    <defs>
      <clipPath id={`${id}-viewport`}><rect x="0" y="50" width="600" height="342" /></clipPath>
      <radialGradient id={`${id}-ocean`} cx="32%" cy="28%" r="75%"><stop stopColor="#343434" /><stop offset="1" stopColor="#111" /></radialGradient>
      <radialGradient id={`${id}-shade`} cx="35%" cy="30%" r="70%"><stop offset="0.45" stopColor="#000" stopOpacity="0" /><stop offset="0.88" stopColor="#000" stopOpacity="0.25" /><stop offset="1" stopColor="#000" stopOpacity="0.8" /></radialGradient>
      <radialGradient id={`${id}-halo`}><stop offset="0.83" stopColor="#fff" stopOpacity="0" /><stop offset="0.89" stopColor="#fff" stopOpacity="0.12" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
    </defs>
    <g clipPath={zoomed ? `url(#${id}-viewport)` : undefined}>
    <motion.g initial={false} animate={{ scale: zoom }} transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }} style={{ originX: "300px", originY: "218px", transformBox: "view-box" }}>
    <circle cx="300" cy="218" r="166" fill={`url(#${id}-ocean)`} />
    <path data-grid d={initialPath(grid) || ''} fill="none" stroke="#777" strokeOpacity="0.3" strokeWidth="0.6" />
    <path data-land d={initialPath(land) || ''} fill="#aaa" stroke="#ddd" strokeWidth="0.35" />
    <circle cx="300" cy="218" r="166" fill={`url(#${id}-shade)`} pointerEvents="none" />
    <circle cx="300" cy="218" r="166" fill="none" stroke="#bbb" strokeOpacity="0.45" strokeWidth="0.8" />
    <path data-route fill="none" stroke="#fff" strokeWidth="1.4" strokeDasharray="3 3" />
    {cities.map(city => {
      const coordinate: Coordinate = [city.lon, city.lat];
      const position = initialProjection(coordinate)!;
      const active = city.city === destination.city;
      return <g key={city.city} data-city transform={`translate(${position[0].toFixed(3)},${position[1].toFixed(3)})`}
        visibility={geoDistance([destination.lon, destination.lat], coordinate) < Math.PI / 2 ? 'visible' : 'hidden'}>
        {active && <circle r="9" fill="none" stroke="#fff" strokeOpacity="0.7" />}
        <circle r={active ? 4 : 2.5} fill="#fff" stroke="#111" strokeWidth="1.5" />
        {active && <text x="14" y="-12" fill="white" stroke="#111" strokeWidth="3" paintOrder="stroke" fontFamily="monospace">{city.city.toUpperCase()}</text>}
      </g>;
    })}
    </motion.g>
    </g>
  </svg></>;
}
