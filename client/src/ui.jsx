import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const tone = s => { let h = 0; for (const c of s || '') h = (h * 31 + c.charCodeAt(0)) % 360; return `hsl(${30 + h % 25} ${12 + h % 10}% ${24 + h % 14}%)`; };
const imageUrl = src => {
  if (typeof src !== 'string' || !src.trim()) return '';
  const value = src.trim();
  if (/^(https?:|data:|blob:|\/\/)/i.test(value)) return value;

  let path = value.replace(/\\/g, '/');
  const publicFolder = path.toLowerCase().lastIndexOf('/public/');
  if (publicFolder >= 0) path = path.slice(publicFolder + '/public/'.length);
  else path = path.replace(/^\/?(?:client\/)?public\//i, '');

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};
export const Img = ({ src, label, className = '' }) => {
  const [failed, setFailed] = useState(false);
  const url = imageUrl(src);
  useEffect(() => setFailed(false), [url]);

  return url && !failed
    ? <img className={className} src={url} alt={label} loading="lazy" onError={() => setFailed(true)} />
    : <div className={`ph ${className}`} style={{ background: tone(label) }} role="img" aria-label={label}><span>{(label || '?').split(' ').map(w => w[0]).slice(0, 2).join('')}</span></div>;
};
export const State = ({ s, children }) => s.loading ? <p className="note">Loading…</p> : s.error ? <p className="note err">{s.error}</p> : !s.data?.length && Array.isArray(s.data) ? <p className="note">Nothing matches yet. Try a different filter.</p> : children(s.data);
export const Chips = ({ items, value, onChange }) => <div className="chips">{items.map(i => <button key={i} className={i === value ? 'on' : ''} onClick={() => onChange(i)}>{i}</button>)}</div>;
export const ManagerCard = ({ m }) => <article className="mcard"><Img src={m.profileImage} label={m.name} /><div><h3>{m.name}</h3><p className="role">{m.position}</p>
  <p className="meta">{m.experience}+ years · {m.successfulEvents}+ events · {m.location}</p><p>Specialises in {m.specialization}</p><Link className="link" to={`/team/${m._id}`}>View full profile</Link></div></article>;
export const EventCard = ({ e }) => <Link to={`/events/${e._id}`} className="ecard"><Img src={e.image} label={e.title} /><div><h3>{e.title}</h3>
  <p className="meta">{e.category}, {e.location}, {e.date && new Date(e.date).getFullYear()}</p>{e.manager && <p className="meta">Managed by {e.manager.name}</p>}</div></Link>;
