import 'dotenv/config';
import mongoose from 'mongoose';
import { Manager, Event, Enquiry, Testimonial } from '../models/index.js';
await mongoose.connect(process.env.MONGO_URI);
await Promise.all([Manager, Event, Enquiry, Testimonial].map(m => m.deleteMany()));
const sk = (...a) => a.map(([name, level]) => ({ name, level }));
const L = ['English','Hindi','Marathi'];
const mk = (
  name, position, specialization, group,
  experience, successfulEvents, location, languages,
  n, bio, skills, profileImage, gallery = []
) => ({
  name,
  position,
  specialization,
  group,
  experience,
  successfulEvents,
  location,
  languages,
  phone: `+91 98000 0000${n}`,
  email: `${name.split(' ')[0].toLowerCase()}@evokeevents.com`,
  bio,
  skills,
  profileImage,
  gallery
});
const M = await Manager.insertMany([
 
mk(
  'Aanya Patil',
  'Senior Wedding & Event Manager',
  'Weddings & Engagements',
  'Weddings',
  8,
  120,
  'Pune',
  L,
  1,
  'Aanya has spent more than eight years turning wedding celebrations into carefully planned experiences. From venue selection and vendor coordination to guest management and day-of execution, she makes complex celebrations feel effortless.',
  sk(
    ['Wedding Planning', 95],
    ['Vendor Management', 92],
    ['Budget Planning', 88],
    ['Guest Management', 94],
    ['Decoration Coordination', 90]
  ),
  '/images/manager/anaya.jpg',
  ['/images/managerwork/anaya-wedd.jpg', '/images/managerwork/anaya-eng.jpg']
),
 mk('Rohan Deshmukh','Corporate & College Events Lead','Corporate & College Events','Corporate',6,95,'Pune',L,2,'Rohan runs annual meets, product launches and campus festivals with a production manager\u2019s habits: run-sheets first, surprises never.',sk(['Run-of-Show',94],['AV & Staging',89],['Sponsor Coordination',85],['Budget Planning',90]),'/images/manager/rohan.jpg',[
  '/images/managerwork/rohan-birthday.png',
  '/images/managerwork/rohan-dinner.jpg',
  '/images/managerwork/rohan-eng.jpg',
  '/images/managerwork/rohan-name.jpg',
  '/images/managerwork/rohan-wedd.jpg'
 ]),
 mk('Meera Kulkarni','Birthday & Theme Party Designer','Birthdays & Theme Parties','Birthdays',5,110,'Kolhapur',L,3,'Meera builds parties around one idea and carries it through d\u00e9cor, games and the cake table.',sk(['Theme Design',96],['Entertainment',91],['Decoration Coordination',93],['Guest Management',86]),'/images/manager/meera.jpg',[
  '/images/managerwork/meera-birthday.jpg',
  '/images/managerwork/meera-dinner.jpg',
  '/images/managerwork/meera-meet.jpg',
  '/images/managerwork/meera-naming.jpg'
 ]),
 mk('Aditya Joshi','Destination Wedding Manager','Destination Weddings','Weddings',7,60,'Mumbai',['English','Hindi','Gujarati'],4,'Aditya plans weddings that travel: guest logistics, resort contracts and multi-day schedules across Goa, Udaipur and Alibaug.',sk(['Travel Logistics',95],['Vendor Management',91],['Wedding Planning',90],['Budget Planning',87]),'/images/manager/aditya.jpg',['/images/managerwork/art-gallary.jpg',
  '/images/managerwork/art-gallary2.jpg',
  '/images/managerwork/art-gallary3.jpg',
  '/images/managerwork/art-gallary4.jpg',
  '/images/managerwork/art-gallary5.jpg',
  '/images/managerwork/art-gallary6.jpg'
]),
 mk('Sneha Shah','Traditional Ceremonies Specialist','Traditional Ceremonies','Traditional',9,140,'Mumbai',['English','Hindi','Gujarati','Marathi'],5,'Sneha coordinates naming ceremonies, baby showers and pujas, working with priests and families so every ritual keeps its timing.',sk(['Ritual Scheduling',97],['Family Coordination',94],['Floral Decoration',90],['Catering Coordination',88]),'/images/manager/sneha.jpg',[
  '/images/managerwork/sneha-marathi.jpg',
  '/images/managerwork/sneha-eng.jpg',
  '/images/managerwork/sneha-dinner.jpg',
  '/images/managerwork/sneha-arav.jpg'
 ]),
 mk('Kabir More','Large-Scale & Cultural Events Director','Large-Scale & Cultural Events','Large Events',10,85,'Kolhapur',L,6,'Kabir produces festivals and receptions of 1,000+ guests, with crowd flow, permits and power planned before load-in.',sk(['Crowd Management',95],['Permits & Safety',92],['Staging & Lighting',93],['Vendor Management',89]),'/images/manager/kabir.jpg',[
  '/images/managerwork/kabir-birthday.jpg',
  '/images/managerwork/kabir-dinner.jpg',
  '/images/managerwork/kabir-namming.jpg',
  '/images/managerwork/kabir-wedding.jpg'
 ])
]);
const T = [['Royal Marathi Wedding','Wedding',450,['Venue Management','Decoration','Catering Coordination','Guest Management','Photography Coordination','Entertainment','Transportation']],
 ['Riverside Engagement','Engagement',180,['Decoration','Catering Coordination','Photography Coordination']],
 ['Sharma Family Naming Ceremony','Naming Ceremony',80,['Floral Decoration','Catering Coordination']],
 ['TechNova Annual Meet','Corporate',300,['Venue Management','AV & Staging','Entertainment']],
 ['Aarav\u2019s 1st Birthday','Birthday',60,['Theme Decoration','Entertainment','Catering Coordination']],
 ['Silver Jubilee Dinner','Anniversary',120,['Decoration','Catering Coordination','Photography Coordination']]];
const locs = ['Pune','Mumbai','Kolhapur','Goa','Satara'];
const adityaEventImages = {
  'TechNova Annual Meet': '/images/managerwork/aditya-annualmeet.jpg',
  'Aarav\u2019s 1st Birthday': '/images/managerwork/aditya-birthday.jpg',
  'Silver Jubilee Dinner': '/images/managerwork/aditya-dinner.jpg',
  'Royal Marathi Wedding': '/images/managerwork/aditya-wedding.jpg'
};
const snehaEventImages = {
  'Royal Marathi Wedding': '/images/managerwork/sneha-marathi.jpg',
  'Riverside Engagement': '/images/managerwork/sneha-eng.jpg',
  'Silver Jubilee Dinner': '/images/managerwork/sneha-dinner.jpg',
  'Aarav\u2019s 1st Birthday': '/images/managerwork/sneha-arav.jpg'
};
const kabirEventImages = {
  'Aarav\u2019s 1st Birthday': '/images/managerwork/kabir-birthday.jpg',
  'Silver Jubilee Dinner': '/images/managerwork/kabir-dinner.jpg',
  'Sharma Family Naming Ceremony': '/images/managerwork/kabir-namming.jpg',
  'Royal Marathi Wedding': '/images/managerwork/kabir-wedding.jpg'
};
const rohanEventImages = {
  'Aarav\u2019s 1st Birthday': '/images/managerwork/rohan-birthday.png',
  'Riverside Engagement': '/images/managerwork/rohan-eng.jpg',
  'Sharma Family Naming Ceremony': '/images/managerwork/rohan-name.jpg'
};
const meeraEventImages = {
  'Aarav\u2019s 1st Birthday': '/images/managerwork/meera-birthday.jpg',
  'Silver Jubilee Dinner': '/images/managerwork/meera-dinner.jpg',
  'TechNova Annual Meet': '/images/managerwork/meera-meet.jpg',
  'Sharma Family Naming Ceremony': '/images/managerwork/meera-naming.jpg'
};
const aanyaEventImages = {
  'Royal Marathi Wedding': '/images/managerwork/anaya-wedd.jpg',
  'Riverside Engagement': '/images/managerwork/anaya-eng.jpg'
};
const ev = [];
M.forEach((m, mi) => { for (let k = 0; k < 4; k++) { const t = T[(mi + k) % T.length];
  ev.push({ title: `${t[0]} (${2022 + ((mi + k) % 4)})`, category: t[1],
   ...(m.name === 'Aditya Joshi' && adityaEventImages[t[0]] ? { image: adityaEventImages[t[0]] } :
      m.name === 'Sneha Shah' && snehaEventImages[t[0]] ? { image: snehaEventImages[t[0]] } :
      m.name === 'Kabir More' && kabirEventImages[t[0]] ? { image: kabirEventImages[t[0]] } :
      m.name === 'Rohan Deshmukh' && rohanEventImages[t[0]] ? { image: rohanEventImages[t[0]] } :
      m.name === 'Meera Kulkarni' && meeraEventImages[t[0]] ? { image: meeraEventImages[t[0]] } :
      m.name === 'Aanya Patil' && aanyaEventImages[t[0]] ? { image: aanyaEventImages[t[0]] } : {}),
   location: locs[(mi + k) % 5], guestCount: t[2] + k * 20,
   date: new Date(2022 + ((mi + k) % 4), (mi * 2 + k * 3) % 12, 10 + k), services: t[3], clientName: 'Private client', manager: m._id,
   description: `Complete ${t[1].toLowerCase()} planning including venue coordination, decoration, catering, guest management and ceremony scheduling.`,
   feedback: 'Everything ran on time and we got to enjoy the day.' }); } });
await Event.insertMany(ev);
await Testimonial.insertMany([['Priya & Rahul','From the first planning meeting to the final ceremony, the team handled everything. We enjoyed our wedding without worrying about logistics.','Wedding'],['Neha Sharma','Our naming ceremony was calm, on time and beautifully decorated.','Naming Ceremony'],['TechNova Pvt Ltd','Three hundred attendees, zero AV issues. We have booked them again.','Corporate'],['Aarav\u2019s parents','The theme carried through to the cake table. Kids and parents loved it.','Birthday'],['Isha & Karan','Logistics for 90 guests were handled perfectly.','Wedding'],['Prof. Deshpande','Our college fest ran smoothly across three stages.','College']].map(([author,quote,eventType]) => ({ author, quote, eventType })));
await Enquiry.create({ name:'Sample Client', email:'client@example.com', phone:'9800000000', eventType:'Wedding', guestCount:250, location:'Pune', budget:'5-10 lakh', message:'Looking for a December date.', manager: M[0]._id });
console.log('Seeded'); process.exit(0);
