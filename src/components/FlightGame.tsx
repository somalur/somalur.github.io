"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/land-110m.json";
import styles from "./FlightGame.module.css";

type Stop = { city: string; lon: number; lat: number; company: string; date: string; focus: string; description: string };
type Point = [number, number];
const land = feature(world as unknown as Topology<{ land: GeometryCollection }>, (world as unknown as Topology<{ land: GeometryCollection }>).objects.land);
const grid = geoGraticule10();
const storageKey = "portfolio-flight-passport-v1";
const directions: Record<string, Point> = { ArrowUp: [0, 1], w: [0, 1], ArrowDown: [0, -1], s: [0, -1], ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0] };

export default function FlightGame({ stops }: { stops: Stop[] }) {
  const [open, setOpen] = useState(false);
  return <div className={styles.entry}>
    <button type="button" className={styles.toggle} aria-expanded={open} aria-controls="flight-game" onClick={() => setOpen(!open)}>{open ? "Close flight mode" : "Explore by plane"} <span aria-hidden="true">↗</span></button>
    {open && <Game stops={stops} />}
  </div>;
}

function Game({ stops }: { stops: Stop[] }) {
  const cities = stops.filter((stop, i) => stops.findIndex(item => item.city === stop.city) === i);
  const [position, setPosition] = useState<Point>([-90, 30]);
  const [heading, setHeading] = useState(45);
  const [visited, setVisited] = useState<string[]>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(saved) ? [...new Set(saved.filter((value): value is string => typeof value === "string" && stops.some(stop => stop.city === value)))] : [];
    } catch { return []; }
  });
  const [landed, setLanded] = useState<string | null>(null);
  const [target, setTarget] = useState("Atlanta");
  const [storageAvailable, setStorageAvailable] = useState(true);
  const held = useRef(new Set<string>());
  const reduced = useReducedMotion();
  const control = useRef<HTMLDivElement>(null);
  const destination = cities.find(city => city.city === target)!;
  const distance = (city: Stop) => geoDistance(position, [city.lon, city.lat]) * 6371;
  const nearest = [...cities].sort((a, b) => distance(a) - distance(b))[0];
  const canLand = distance(nearest) < 220;
  const projection = geoOrthographic().translate([300, 245]).scale(220).rotate([-position[0], -position[1]]).clipAngle(90);
  const path = geoPath(projection);

  useEffect(() => {
    let frame = 0;
    let previous = 0;
    const tick = (time: number) => {
      const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      let x = 0, y = 0;
      held.current.forEach(key => { const direction = directions[key]; if (direction) { x += direction[0]; y += direction[1]; } });
      if ((x || y) && !landed) {
        const length = Math.hypot(x, y);
        setHeading(Math.atan2(x, y) * 180 / Math.PI);
        setPosition(([lon, lat]) => [((lon + x / length * delta * 24 + 540) % 360) - 180, Math.max(-80, Math.min(80, lat + y / length * delta * 24))]);
      }
      frame = requestAnimationFrame(tick);
    };
    const clear = () => held.current.clear();
    const release = (event: KeyboardEvent) => held.current.delete(event.key.toLowerCase().length === 1 ? event.key.toLowerCase() : event.key);
    frame = requestAnimationFrame(tick);
    window.addEventListener("keyup", release);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    return () => { cancelAnimationFrame(frame); clear(); window.removeEventListener("keyup", release); window.removeEventListener("blur", clear); document.removeEventListener("visibilitychange", clear); };
  }, [landed]);

  function landHere() {
    if (!canLand) return;
    held.current.clear();
    setLanded(nearest.city);
    const next = [...new Set([...visited, nearest.city])];
    setVisited(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { setStorageAvailable(false); }
  }

  const bearingLon = ((destination.lon - position[0] + 540) % 360) - 180;
  const course = `${destination.lat >= position[1] ? "north" : "south"}${Math.abs(bearingLon) > 1 ? bearingLon > 0 ? "east" : "west" : ""}`;

  return <motion.div id="flight-game" className={styles.game} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
    <div className={styles.header}><div><h3>Your flight passport</h3><p>Land in four cities to discover the work behind each stop.</p></div><span aria-live="polite">{visited.length} / {cities.length} stamps</span></div>
    <div className={styles.layout}>
      <div>
        <div ref={control} className={styles.viewport} tabIndex={0} role="group" aria-label="Flight controls" aria-describedby="flight-help" onBlur={() => held.current.clear()} onKeyDown={event => {
          const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
          if (directions[key]) { event.preventDefault(); held.current.add(key); }
        }}>
          <svg viewBox="0 0 600 490" role="img" aria-label={`Plane at ${position[1].toFixed(1)} degrees latitude, ${position[0].toFixed(1)} degrees longitude`}>
            <circle cx="300" cy="245" r="220" fill="#202020" stroke="#666" />
            <path d={path(grid) || ""} fill="none" stroke="#444" strokeWidth="0.7" />
            <path d={path(land) || ""} fill="#aaa" stroke="#ddd" strokeWidth="0.4" />
            {cities.map(city => {
              const point: Point = [city.lon, city.lat];
              const projected = projection(point)!;
              if (geoDistance(position, point) > Math.PI / 2) return null;
              return <g key={city.city} transform={`translate(${projected[0]},${projected[1]})`}>
                <circle r={city.city === target ? 8 : 5} fill={visited.includes(city.city) ? "#111" : "white"} stroke="white" strokeWidth="2" />
                <text x="12" y={city.city === "Chennai" ? 20 : -12} fill="white" stroke="#111" strokeWidth="4" paintOrder="stroke" fontSize="14">{city.city}{visited.includes(city.city) ? " ✓" : ""}</text>
              </g>;
            })}
            <g transform={`translate(300,245) rotate(${heading})`}><path d="M0 -20 L4 -6 L22 6 L22 10 L4 4 L3 17 L9 22 L9 25 L0 22 L-9 25 L-9 22 L-3 17 L-4 4 L-22 10 L-22 6 L-4 -6 Z" fill="white" stroke="#111" strokeWidth="2" /></g>
          </svg>
          <span className={styles.coordinates}>{Math.abs(position[1]).toFixed(1)}° {position[1] < 0 ? 'S' : 'N'} / {Math.abs(position[0]).toFixed(1)}° {position[0] < 0 ? 'W' : 'E'}</span>
        </div>
        <p id="flight-help" className={styles.help}>Focus the globe, then hold arrow keys or WASD to fly. Use the direction buttons on touch screens. Release to stop.</p>
        <div className={styles.controls} aria-label="Plane directions">
          {([['ArrowLeft', 'West', '←'], ['ArrowUp', 'North', '↑'], ['ArrowDown', 'South', '↓'], ['ArrowRight', 'East', '→']] as const).map(([key, label, icon]) => <button key={key} type="button" aria-label={`Fly ${label.toLowerCase()}`} disabled={!!landed}
            onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); held.current.add(key); }} onPointerUp={() => held.current.delete(key)} onPointerCancel={() => held.current.clear()} onLostPointerCapture={() => held.current.clear()}
            onClick={event => { if (event.detail === 0) { const [x, y] = directions[key]; setPosition(([lon, lat]) => [((lon + x + 540) % 360) - 180, Math.max(-80, Math.min(80, lat + y))]); setHeading(Math.atan2(x, y) * 180 / Math.PI); } }}>{icon}</button>)}
        </div>
      </div>
      <div className={styles.panel}>
        <label htmlFor="flight-destination">Navigation target</label>
        <select id="flight-destination" value={target} onChange={event => setTarget(event.target.value)}>{cities.map(city => <option key={city.city}>{city.city}</option>)}</select>
        <p>{Math.round(distance(destination)).toLocaleString()} km ({Math.round(distance(destination) / 1.609344).toLocaleString()} miles) to {target} · Head {course}</p>
        <button type="button" className={styles.assist} disabled={!!landed} onClick={() => { held.current.clear(); setPosition([destination.lon - 3, destination.lat - 1]); control.current?.focus({ preventScroll: true }); }}>Start near {target}</button>
        <p className={styles.help}>Short on time? Start nearby, then steer into the landing zone (220 km).</p>
        <button type="button" className={styles.land} disabled={!canLand || !!landed} onClick={landHere}>{landed ? `Landed in ${landed}` : canLand ? `Land in ${nearest.city}` : "Fly closer to a city to land"}</button>
        <div className={styles.passport} aria-label="Collected passport stamps">{cities.map(city => <span key={city.city} data-collected={visited.includes(city.city)}>{visited.includes(city.city) ? '✓' : '○'} {city.city}</span>)}</div>
        {visited.length > 0 && <button type="button" onClick={() => {
          held.current.clear(); setVisited([]); setLanded(null); setPosition([-90, 30]); setTarget("Atlanta"); setHeading(45);
          try { localStorage.removeItem(storageKey); } catch { setStorageAvailable(false); }
        }}>Reset passport</button>}
        {!storageAvailable && <p className={styles.help}>Progress is available for this flight only; browser storage is unavailable.</p>}
        <div aria-live="polite">{visited.length === cities.length && <p className={styles.complete}>Passport complete. You’ve visited every career destination.</p>}</div>
        {landed && <div className={styles.arrival}>
          <h4>Welcome to {landed}</h4>
          {stops.filter(stop => stop.city === landed).map(stop => <article key={stop.company}><p className={styles.help}>{stop.date}</p><h5>{stop.company}</h5><p>{stop.focus}</p><p>{stop.description}</p></article>)}
          <button type="button" onClick={() => { setLanded(null); control.current?.focus({ preventScroll: true }); }}>Take off again</button>
        </div>}
        <a href="#contact">Contact me</a>
      </div>
    </div>
  </motion.div>;
}
