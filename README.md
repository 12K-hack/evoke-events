# Evoke Events - MERN event management site
## Setup
1. MongoDB: run locally (`mongodb://127.0.0.1:27017`) or use Atlas and set `MONGO_URI` in `server/.env`.
2. `cd server && npm install && npm run seed && npm start` (API on :5000)
3. `cd client && npm install && npm run dev` (site on :5173; set `VITE_API_URL` in `client/.env`)
## Pages
/, /team, /team/:id, /events, /events/:id, /contact, /admin
## API
GET/POST `/api/{managers,events,enquiries,testimonials}`; GET/PUT/DELETE `/api/<resource>/:id`; GET `/api/stats`.
Events accept `?category=&manager=&q=`; managers accept `?group=&q=`.
## Images
Image fields (`profileImage`, `image`, and manager `gallery` entries) accept browser-accessible URLs or paths to files under `client/public`. For example, `client/public/images/manager/aditya.jpg` should be stored as `/images/manager/aditya.jpg`. Empty or unavailable images show a tonal placeholder.
## Not included yet
Admin login, admin CRUD forms for managers/events/testimonials, galleries + lightbox, image uploads, charts.
`/admin` has no authentication - add auth before deploying.
