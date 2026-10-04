"use client";

import { useState } from "react";
import styles from "./LocationDetail.module.css";

// Office addresses supplied by the portfolio owner.
const locations = [
  { name: "Block + Tackle", type: "Work", city: "Atlanta, United States", address: "2088 Hollywood Rd NW, Atlanta, GA 30318, USA" },
  { name: "Tribute Technology", type: "Work", city: "Needham Heights, Massachusetts, United States", address: "220 Reservoir St, Needham Heights, MA 02494, USA" },
  { name: "CodePlex Technology Services", type: "Work", city: "Bangalore, India", address: "VO-308, Virtual Office, No 78/9, WeWork Vaishnavi Signature, Outer Ring Road, Bengaluru, Karnataka, India" },
  { name: "Mindzen Inc", type: "Work", city: "Tambaram, Chennai, India", address: "S2 second floor, Fortune house, 10, Bharathi St, Srinivasa Nagar, New Perungalathur, Chennai, Tambaram, Tamil Nadu 600063, India" },
  { name: "Rao’s Infosoft Join Pvt Limited", type: "Work", city: "Bangalore, India", address: "250, Florentine, Himagiri Meadows, Gottigere, Bengaluru, Karnataka 560083, India" },
  { name: "Georgia Institute of Technology", type: "Postgraduate degree", city: "Atlanta, United States", address: "Georgia Institute of Technology, Atlanta, Georgia, USA" },
  { name: "SRM Institute of Science and Technology", type: "Undergraduate degree", city: "Kattankulathur, India", address: "SRM Institute of Science and Technology, Kattankulathur, Tamil Nadu, India" },
];

export default function LocationDetail({ city }: { city: string }) {
  const available = locations.filter(place => city === 'Atlanta' ? place.city.includes('Atlanta') : city === 'Boston' ? place.city.includes('Needham') : city === 'Bangalore' ? place.city.includes('Bangalore') : place.city.includes('Chennai') || place.city.includes('Kattankulathur'));
  const [selected, setSelected] = useState(0);
  const place = available[selected] || available[0];
  const query = encodeURIComponent(place.address || place.city);
  return <div className={styles.detail}>
    <div id="location-detail" className={styles.content}>
      <label htmlFor="location-picker">Workplace or university</label>
      <select id="location-picker" value={selected} onChange={event => setSelected(Number(event.target.value))}>
        {available.map((location, index) => <option key={location.name} value={index}>{location.type === 'Work' ? '● Workplace' : '■ Education'} — {location.name}</option>)}
      </select>
      <p className={styles.meta}>{place.type} · {place.city}</p>
      <h3>{place.name}</h3>
      <p>{place.address || "City overview. The exact office address has not been added yet."}</p>
      <iframe key={query} title={`Location map: ${place.name}${place.address ? '' : ' — city overview'}`} src={`https://maps.google.com/maps?q=${query}&z=${place.address ? 16 : 11}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      <a href={`https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer">Open {place.address ? 'location' : 'city'} in Google Maps ↗</a>
    </div>
  </div>;
}
