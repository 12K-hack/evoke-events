import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const t = { timestamps: true };
export const Manager = model('Manager', new Schema({
  name: { type: String, required: true }, profileImage: String, position: String, bio: String,
  experience: Number, successfulEvents: Number, specialization: String,
  group: { type: String, enum: ['Weddings','Corporate','Birthdays','Traditional','Large Events'] },
  location: String, phone: String, email: String, languages: [String],
  skills: [{ name: String, level: Number }], socialLinks: { instagram: String, linkedin: String, facebook: String }, gallery: [String]
}, t));
export const Event = model('Event', new Schema({
  title: { type: String, required: true }, category: String, description: String, image: String, gallery: [String],
  location: String, date: Date, guestCount: Number, services: [String], clientName: String,
  feedback: String, manager: { type: Schema.Types.ObjectId, ref: 'Manager' }
}, t));
export const Enquiry = model('Enquiry', new Schema({
  name: { type: String, required: true }, email: { type: String, required: true }, phone: { type: String, required: true },
  eventType: String, eventDate: Date, guestCount: Number, location: String, budget: String, message: String,
  manager: { type: Schema.Types.ObjectId, ref: 'Manager' },
  status: { type: String, enum: ['Pending','Contacted','Confirmed','Completed','Cancelled'], default: 'Pending' }
}, t));
export const Testimonial = model('Testimonial', new Schema({ author: String, quote: String, eventType: String }, t));
