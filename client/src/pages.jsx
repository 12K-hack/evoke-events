import { useState } from 'react'; import { Link, useParams } from 'react-router-dom';
import { api, useGet } from './api'; import { Img, State, Chips, ManagerCard, EventCard } from './ui';

const ADITYA_GALLERY = [
  '/images/managerwork/art-gallary.jpg',
  '/images/managerwork/art-gallary2.jpg',
  '/images/managerwork/art-gallary3.jpg',
  '/images/managerwork/art-gallary4.jpg',
  '/images/managerwork/art-gallary5.jpg',
  '/images/managerwork/art-gallary6.jpg'
];
const managerGallery = manager => Array.isArray(manager.gallery) && manager.gallery.length
  ? manager.gallery
  : manager.name === 'Aditya Joshi' ? ADITYA_GALLERY : [];

export function Home() {
  const m = useGet('/managers'), t = useGet('/testimonials'), st = useGet('/stats');
  return <>
    <header className="hero"><div className="heroText"><h1>Evoke Events</h1><p className="tag">We Plan. You Celebrate.</p>
      <p>From intimate celebrations to grand occasions, we turn your special moments into unforgettable experiences.</p>
      <div className="row"><Link className="btn" to="/contact">Plan your event</Link><Link className="btn ghost" to="/team">Meet our team</Link></div></div>
    <div className="heroPlate">
  <div className="heroImage">
    <img
      src="/images/hero/location.jpg"
      alt="Pune Mumbai Kolhapur event locations"
    />
    <span>Pune · Mumbai · Kolhapur</span>
  </div>

  <div className="heroImage">
    <img
      src="/images/hero/event.jpg"
      alt="Evoke Events celebration"
    />
    <span>Evoke Events</span>
  </div>
</div></header>
    <section className="wrap"><h2>The people who will run your day</h2>
      <State s={m}>{d => <div className="grid3">{d.map(x => <ManagerCard key={x._id} m={x} />)}</div>}</State></section>
    <section className="band"><div className="wrap"><h2>Moments we've made memorable</h2>
      <dl className="stats"><div><dt>Events completed</dt><dd>500+</dd></div><div><dt>Event managers</dt><dd>{m.data?.length ?? 6}</dd></div><div><dt>Client satisfaction</dt><dd>98%</dd></div><div><dt>Years of experience</dt><dd>8+</dd></div></dl></div></section>
    <section className="wrap"><h2>What our clients say</h2>
      <State s={t}>{d => <div className="grid3">{d.map(x => <blockquote key={x._id}><p>{x.quote}</p><footer>{x.author}</footer></blockquote>)}</div>}</State></section></>;
}
export function Team() {
  const [g, setG] = useState('All'); const s = useGet('/managers', g === 'All' ? {} : { group: g });
  return <section className="wrap page"><h1>Meet our event managers</h1>
    <Chips items={['All','Weddings','Corporate','Birthdays','Traditional','Large Events']} value={g} onChange={setG} />
    <State s={s}>{d => <div className="grid3">{d.map(x => <ManagerCard key={x._id} m={x} />)}</div>}</State></section>;
}
export function Manager() {
  const { id } = useParams(); const s = useGet(`/managers/${id}`); const ev = useGet('/events', { manager: id });
  return <section className="wrap page"><State s={{ ...s, data: s.data && [s.data] }}>{([m]) => <>
    <div className="profile"><Img src={m.profileImage} label={m.name} /><div><h1>{m.name}</h1><p className="role">{m.position}</p><p className="long">{m.bio}</p>
      <ul className="facts"><li>Experience: {m.experience}+ years</li><li>Events completed: {m.successfulEvents}+</li><li>Specialisation: {m.specialization}</li><li>Based in: {m.location}</li><li>Languages: {m.languages.join(', ')}</li></ul>
      <p>{m.phone} · <a href={`mailto:${m.email}`}>{m.email}</a></p><Link className="btn" to={`/contact?manager=${m._id}`}>Request {m.name.split(' ')[0]}</Link></div></div>
    <h2>Skills</h2>{m.skills.map(k => <div className="skill" key={k.name}><span>{k.name}</span><i style={{ '--w': k.level + '%' }} /><b>{k.level}%</b></div>)}
    
<h2>Our Work & Event Gallery</h2>

<div className="manager-work-grid">
  {managerGallery(m).map((image, index) => (
    <div className="manager-work-card" key={`${image}-${index}`}>
      <Img src={image} label={`${m.name} event ${index + 1}`} />
    </div>
  ))}
</div>
    <h2>Events successfully managed</h2><State s={ev}>{d => <div className="grid3">{d.map(e => <EventCard key={e._id} e={{ ...e, manager: null }} />)}</div>}</State></>}</State></section>;
}
export function Events() {
  const [c, setC] = useState('All'), [q, setQ] = useState('');
  const s = useGet('/events', { ...(c !== 'All' && { category: c }), ...(q && { q }) });
  return <section className="wrap page"><h1>Our events</h1>
    <input className="search" placeholder="Search by event, city or type" value={q} onChange={e => setQ(e.target.value)} aria-label="Search events" />
    <Chips items={['All','Wedding','Birthday','Engagement','Anniversary','Naming Ceremony','Corporate','College','Farewell','Cultural']} value={c} onChange={setC} />
    <State s={s}>{d => <div className="grid3">{d.map(e => <EventCard key={e._id} e={e} />)}</div>}</State></section>;
}
export function EventDetail() {
  const { id } = useParams(); const s = useGet(`/events/${id}`);
  return <section className="wrap page"><State s={{ ...s, data: s.data && [s.data] }}>{([e]) => <>
    <Img className="cover" src={e.image} label={e.title} /><h1>{e.title}</h1>
    <p className="meta">{e.category} · {e.location} · {new Date(e.date).toLocaleDateString('en-IN', { dateStyle: 'long' })} · {e.guestCount}+ guests</p>
    {e.manager && <p>Managed by <Link className="link" to={`/team/${e.manager._id}`}>{e.manager.name}</Link></p>}
    <p className="long">{e.description}</p><h2>Services provided</h2><ul className="facts">{e.services.map(x => <li key={x}>{x}</li>)}</ul>
    {e.feedback && <blockquote><p>{e.feedback}</p><footer>{e.clientName}</footer></blockquote>}</>}</State></section>;
}
const blank = { name: '', email: '', phone: '', eventType: 'Wedding', eventDate: '', guestCount: '', location: '', budget: '', manager: '', message: '' };
export function Contact() {
  const pre = new URLSearchParams(location.search).get('manager') || '';
  const [f, setF] = useState({ ...blank, manager: pre }), [err, setErr] = useState({}), [done, setDone] = useState(false), [busy, setBusy] = useState(false), [fail, setFail] = useState('');
  const m = useGet('/managers'); const set = k => e => setF({ ...f, [k]: e.target.value });
  async function submit(e) { e.preventDefault(); const x = {};
    if (!f.name.trim()) x.name = 'Enter your name.'; if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email.';
    if (!/^[+\d][\d\s-]{8,}$/.test(f.phone)) x.phone = 'Enter a phone number with at least 9 digits.';
    setErr(x); if (Object.keys(x).length) return; setBusy(true); setFail('');
    try { await api.post('/enquiries', { ...f, manager: f.manager || undefined, guestCount: f.guestCount || undefined, eventDate: f.eventDate || undefined }); setDone(true); }
    catch (er) { setFail(er.response?.data?.error || 'Could not send. Check your connection and try again.'); } setBusy(false); }
  if (done) return <section className="wrap page"><h1>Thank you!</h1><p>Our team will contact you shortly.</p></section>;
  const Field = ({ k, label, type = 'text' }) => <label>{label}<input type={type} value={f[k]} onChange={set(k)} />{err[k] && <small className="err">{err[k]}</small>}</label>;
  return <section className="wrap page narrow"><h1>Book an event</h1><form onSubmit={submit} noValidate>
    <Field k="name" label="Full name" /><Field k="email" label="Email" type="email" /><Field k="phone" label="Phone" />
    <label>Event type<select value={f.eventType} onChange={set('eventType')}>{['Wedding','Engagement','Birthday','Anniversary','Naming Ceremony','Baby Shower','Corporate','College','Farewell','Cultural','Other'].map(o => <option key={o}>{o}</option>)}</select></label>
    <Field k="eventDate" label="Event date" type="date" /><Field k="guestCount" label="Expected guests" type="number" /><Field k="location" label="Preferred location" />
    <label>Budget range<select value={f.budget} onChange={set('budget')}><option value="">Not sure yet</option><option>Under 2 lakh</option><option>2-5 lakh</option><option>5-10 lakh</option><option>10 lakh+</option></select></label>
    <label>Preferred event manager<select value={f.manager} onChange={set('manager')}><option value="">No preference</option>{m.data?.map(x => <option key={x._id} value={x._id}>{x.name}</option>)}</select></label>
    <label>Message<textarea rows="4" value={f.message} onChange={set('message')} /></label>
    {fail && <p className="err">{fail}</p>}<button className="btn" disabled={busy}>{busy ? 'Sending…' : 'Send enquiry'}</button></form></section>;
}
const STATUS = ['Pending','Contacted','Confirmed','Completed','Cancelled'];
export function Admin() {
  const st = useGet('/stats'), [n, bump] = useState(0), q = useGet('/enquiries', { n });
  const upd = (id, status) => api.put(`/enquiries/${id}`, { status }).then(() => bump(n + 1));
  const del = id => confirm('Delete this enquiry?') && api.delete(`/enquiries/${id}`).then(() => bump(n + 1));
  const d = st.data;
  return <section className="wrap page"><h1>Admin</h1><State s={{ ...st, data: d && [d] }}>{([d]) => <>
    <dl className="stats"><div><dt>Managers</dt><dd>{d.managers}</dd></div><div><dt>Events</dt><dd>{d.events}</dd></div><div><dt>Enquiries</dt><dd>{d.enquiries}</dd></div><div><dt>Pending</dt><dd>{d.pending}</dd></div></dl>
    <h2>Events by category</h2>{d.byCat.map(c => <div className="skill" key={c._id}><span>{c._id}</span><i style={{ '--w': Math.min(100, c.n * 12) + '%' }} /><b>{c.n}</b></div>)}</>}</State>
    <h2>Enquiries</h2><State s={q}>{d => <table><tbody>{d.map(e => <tr key={e._id}><td>{e.name}<br /><small>{e.email} · {e.phone}</small></td><td>{e.eventType}</td><td>{e.manager?.name || 'Any'}</td>
      <td><select value={e.status} onChange={x => upd(e._id, x.target.value)} aria-label="Status">{STATUS.map(s => <option key={s}>{s}</option>)}</select></td><td><button className="link" onClick={() => del(e._id)}>Delete</button></td></tr>)}</tbody></table>}</State></section>;
}
