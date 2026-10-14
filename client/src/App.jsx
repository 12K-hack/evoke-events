import { useState } from 'react'; import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { Home, Team, Manager, Events, EventDetail, Contact, Admin } from './pages';
const nav = [['/', 'Home'], ['/team', 'Our Team'], ['/events', 'Events'], ['/contact', 'Contact']];
export default function App() {
  const [open, setOpen] = useState(false);
  return <>
    <nav className="nav"><Link to="/" className="logo">Evoke Events</Link>
      <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>Menu</button>
      <div className={open ? 'links open' : 'links'} onClick={() => setOpen(false)}>{nav.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'}>{l}</NavLink>)}<Link className="btn sm" to="/contact">Plan your event</Link></div></nav>
    <main><Routes><Route path="/" element={<Home />} /><Route path="/team" element={<Team />} /><Route path="/team/:id" element={<Manager />} />
      <Route path="/events" element={<Events />} /><Route path="/events/:id" element={<EventDetail />} /><Route path="/contact" element={<Contact />} /><Route path="/admin" element={<Admin />} />
      <Route path="*" element={<section className="wrap page"><h1>Page not found</h1><Link className="link" to="/">Back to home</Link></section>} /></Routes></main>
    <footer><div className="wrap"><b>Evoke Events</b><p>We Plan. You Celebrate.</p><p>Pune, Maharashtra · +91 XXXXX XXXXX · hello@evokeevents.com</p><p>© 2026 Evoke Events. All rights reserved.</p></div></footer></>;
}
