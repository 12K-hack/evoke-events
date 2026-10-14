import { Router } from 'express';
import { Manager, Event, Enquiry, Testimonial } from '../models/index.js';
const wrap = f => (req, res) => f(req, res).catch(e => res.status(e.name === 'ValidationError' || e.name === 'CastError' ? 400 : 500).json({ error: e.message }));
function crud(Model, { populate, search } = {}) {
  const r = Router();
  r.get('/', wrap(async (req, res) => {
    const q = {};
    for (const k of ['category', 'manager', 'group', 'status']) if (req.query[k]) q[k] = req.query[k];
    if (req.query.q && search) q.$or = search.map(f => ({ [f]: new RegExp(req.query.q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }));
    res.json(await Model.find(q).populate(populate || '').sort('-createdAt'));
  }));
  r.get('/:id', wrap(async (req, res) => {
    const d = await Model.findById(req.params.id).populate(populate || '');
    d ? res.json(d) : res.status(404).json({ error: 'Not found' });
  }));
  r.post('/', wrap(async (req, res) => res.status(201).json(await Model.create(req.body))));
  r.put('/:id', wrap(async (req, res) => res.json(await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }))));
  r.delete('/:id', wrap(async (req, res) => { await Model.findByIdAndDelete(req.params.id); res.json({ ok: true }); }));
  return r;
}
const api = Router();
api.get('/stats', wrap(async (_q, res) => {
  const [managers, events, enquiries, pending, byCat] = await Promise.all([
    Manager.countDocuments(), Event.countDocuments(), Enquiry.countDocuments(),
    Enquiry.countDocuments({ status: 'Pending' }), Event.aggregate([{ $group: { _id: '$category', n: { $sum: 1 } } }])]);
  res.json({ managers, events, enquiries, pending, byCat });
}));
api.use('/managers', crud(Manager, { search: ['name', 'specialization'] }));
api.use('/events', crud(Event, { populate: 'manager', search: ['title', 'category', 'location'] }));
api.use('/enquiries', crud(Enquiry, { populate: 'manager' }));
api.use('/testimonials', crud(Testimonial));
export default api;
