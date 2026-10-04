"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import styles from "../app/page.module.css";
import CareerGlobe from "./CareerGlobe";
import FlightGame from "./FlightGame";
import LocationDetail from "./LocationDetail";

// Career facts stay local so the site remains a static GitHub Pages export.
const stops = [
  { company: "Block + Tackle", date: "July 2026 — Present", year: "2026–", city: "Atlanta", country: "United States", lat: 33.749, lon: -84.388, focus: "Current Position", description: "Joined Block + Tackle in Atlanta in July 2026.", summary: "Helped maintain and fix backend bugs in content authoring software for a Fortune 100 hospitality company, implement Azure CI/CD processes using Terraform and Docker, and support Databricks pipelines to chunk, clean, and generate data for large language models.", skill: "A new chapter" },
  { company: "Tribute Technology", date: "September 2020 — June 2026", year: "2020–26", city: "Boston", country: "United States", lat: 42.3601, lon: -71.0589, focus: "Web platforms and software delivery", description: "Worked across Laravel applications, AWS migrations, e-commerce experiments, GitHub Actions pipelines, and cross-team software releases.", skill: "Full-stack & cloud" },
  { company: "CodePlex Technology Services", date: "June 2019", year: "2019", city: "Bangalore", country: "India", lat: 12.9716, lon: 77.5946, focus: "Content migration", description: "Wrote importers that navigated clients’ existing websites and migrated obituary content onto the CFS platform using web scraping.", skill: "Web scraping" },
  { company: "Mindzen Inc", date: "December 2018", year: "2018", city: "Chennai", country: "India", lat: 13.0827, lon: 80.2707, focus: "Conversational AI", description: "Helped develop an AI-enabled chatbot proof of concept using Google’s Dialogflow platform.", skill: "Conversational AI" },
  { company: "Rao’s Infosoft Join", date: "July 2018", year: "2018", city: "Bangalore", country: "India", lat: 12.9716, lon: 77.5946, focus: "Recruitment research", description: "Compared and tested machine learning algorithms to improve recruitment workflows and communication between companies, recruiters, and applicants.", skill: "Machine learning" },
];

const cities = stops.filter((stop, index) => stops.findIndex(item => item.city === stop.city) === index);

function Flyover({ index }: { index: number }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [detail, setDetail] = useState(false);
  const [lastIndex, setLastIndex] = useState(index);
  if (lastIndex !== index) { setLastIndex(index); setPicked(null); }
  const handleZoom = useCallback((zoom: number) => setDetail(zoom >= 2), []);
  const stop = cities.find(city => city.city === picked) || stops[index];

  const previous = useRef(index);
  const [origin, setOrigin] = useState(index);

  useEffect(() => {
    // Capture the last destination before starting the next flight.
    setOrigin(previous.current);
    previous.current = index;
  }, [index]);
  return (
    <>
    <div className={styles.mapFrame}>
      <CareerGlobe destination={stop} cities={cities} origin={stops[origin]} onZoomChange={handleZoom} onLocationSelect={setPicked} />
      <div className={styles.mapBottom}>
        <div><span className={styles.eyebrow}>{stop.country}</span><strong>{stop.city}</strong></div>
      </div>
      <span className={styles.mapCaption}>Scroll the page to fly · Drag to look around</span>
    </div>
    <div className={styles.locationLegend} aria-label="Location legend"><span>● Workplace</span><span>■ Education</span></div>
    <p className={styles.flightStatus}>Select a city, then Close-up + to see its addresses. Markers show cities; zoom in for campus and office locations.</p>
    {detail && <LocationDetail key={stop.city} city={stop.city} />}
    </>
  );
}

export default function CareerJourney() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const chapters = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = window.innerWidth <= 760 ? Math.min(window.innerHeight * 0.72, 520) : window.innerHeight * 0.5;
      let active = 0;
      chapters.current.forEach((chapter, index) => {
        if (chapter && chapter.getBoundingClientRect().top <= readingLine) active = index;
      });
      setSelected(active);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <section id="journey" aria-labelledby="journey-title">
      <div className={styles.sectionHeading}><h2 id="journey-title">Career history</h2><p>Scroll through the roles to follow the flight.</p></div>
      <FlightGame stops={stops} />
      <nav className={styles.flightStops} aria-label="Career locations">
        {stops.map((item, i) => <a key={item.company} href={`#career-${i}`} aria-current={selected === i ? 'step' : undefined} onClick={event => {
          event.preventDefault();
          chapters.current[i]?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
          history.replaceState(null, '', `#career-${i}`);
        }}>{item.year} · {item.city}</a>)}
      </nav>
      <div className={styles.flightLayout}>
        <div className={styles.flightVisual}>
          <Flyover index={selected} />
          <p className={styles.flightStatus} aria-live="polite">{stops[selected].company} · {stops[selected].city}</p>
        </div>
        <ol className={styles.flightChapters} aria-label="Career timeline, latest to earliest">
          {stops.map((item, i) => <li key={item.company} id={`career-${i}`} ref={element => { chapters.current[i] = element; }} className={styles.flightChapter} data-current={selected === i}>
            <p className={styles.chapterDate}>{item.date} · {item.city}, {item.country}</p>
            <h3 className={styles.chapterCompany}>{item.company}</h3>
            <p className={styles.chapterFocus}>{item.focus}</p>
            <p className={styles.chapterDescription}>{item.description}</p>
            {item.summary && <p className={styles.chapterDescription}>{item.summary}</p>}
          </li>)}
        </ol>
      </div>
    </section>
  );
}
