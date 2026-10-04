"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import styles from "../app/page.module.css";
import CareerGlobe from "./CareerGlobe";

// Career facts stay local so the site remains a static GitHub Pages export.
const stops = [
  { company: "Block + Tackle", date: "July 2026 — Present", year: "2026–", city: "Atlanta", country: "United States", lat: 33.749, lon: -84.388, focus: "Current employer", description: "Joined Block + Tackle in Atlanta in July 2026.", skill: "A new chapter" },
  { company: "Tribute Technology", date: "September 2020 — June 2026", year: "2020–26", city: "Boston", country: "United States", lat: 42.3601, lon: -71.0589, focus: "Web platforms and software delivery", description: "Worked across Laravel applications, AWS migrations, e-commerce experiments, GitHub Actions pipelines, and cross-team software releases.", skill: "Full-stack & cloud" },
  { company: "CodePlex Technology Services", date: "June 2019", year: "2019", city: "Bangalore", country: "India", lat: 12.9716, lon: 77.5946, focus: "Content migration", description: "Wrote importers that navigated clients’ existing websites and migrated obituary content onto the CFS platform using web scraping.", skill: "Web scraping" },
  { company: "Mindzen Inc", date: "December 2018", year: "2018", city: "Chennai", country: "India", lat: 13.0827, lon: 80.2707, focus: "Conversational AI", description: "Helped develop an AI-enabled chatbot proof of concept using Google’s Dialogflow platform.", skill: "Conversational AI" },
  { company: "Rao’s Infosoft Join", date: "July 2018", year: "2018", city: "Bangalore", country: "India", lat: 12.9716, lon: 77.5946, focus: "Recruitment research", description: "Compared and tested machine learning algorithms to improve recruitment workflows and communication between companies, recruiters, and applicants.", skill: "Machine learning" },
];

const cities = stops.filter((stop, index) => stops.findIndex(item => item.city === stop.city) === index);

function Flyover({ index }: { index: number }) {
  const stop = stops[index];

  const previous = useRef(index);
  const [origin, setOrigin] = useState(index);

  useEffect(() => {
    // Capture the last destination before starting the next flight.
    setOrigin(previous.current);
    previous.current = index;
  }, [index]);
  return (
    <div className={styles.mapFrame}>
      <CareerGlobe destination={stop} cities={cities} origin={stops[origin]} />
      <div className={styles.mapBottom}>
        <div><span className={styles.eyebrow}>{stop.country}</span><strong>{stop.city}</strong></div>
      </div>
      <span className={styles.mapCaption}>Drag to rotate · Scroll to zoom · Home to reset</span>
    </div>
  );
}

export default function CareerJourney() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setSelected(current => (current + 1) % stops.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <section id="journey" aria-labelledby="journey-title">
      <div className={styles.sectionHeading}><h2 id="journey-title">Career history</h2><p>Select an employer to see the work and location.</p></div>
      <div className={styles.journeyBody}>
        <Flyover index={selected} />
        <div className={styles.chapterPanel}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={selected} initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.2 }} aria-live="polite">
              <p className={styles.chapterDate}>{stops[selected].date}</p>
              <h3 className={styles.chapterCompany}>{stops[selected].company}</h3>
              <p className={styles.chapterFocus}>{stops[selected].focus}</p>
              <p className={styles.chapterDescription}>{stops[selected].description}</p>
            </motion.div>
          </AnimatePresence>
          <div className={styles.chapterControls}>
            <button aria-label="Previous chapter" disabled={selected === 0} onClick={() => { setSelected(selected - 1); setPlaying(false); }}>←</button>
            <button onClick={() => setPlaying(!playing)} aria-pressed={playing}>{playing ? "Pause tour" : "Play locations"}</button>
            <button aria-label="Next chapter" disabled={selected === stops.length - 1} onClick={() => { setSelected(selected + 1); setPlaying(false); }}>→</button>
          </div>
        </div>
      </div>
      <ol className={styles.lineage} aria-label="Career timeline">
        {stops.map((item, i) => <li key={item.company} data-current={i === selected}><button onClick={() => { setSelected(i); setPlaying(false); }} aria-current={i === selected ? "step" : undefined}><span className={styles.lineageDot} aria-hidden="true" /><span className={styles.lineageYear}>{item.year}</span><strong>{item.company}</strong><span>{item.city}</span></button></li>)}
      </ol>
    </section>
  );
}
