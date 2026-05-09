# 🏫 School Management API

A RESTful API built with **Node.js**, **Express.js**, and **PostgreSQL** to manage school data. Supports adding schools and retrieving them sorted by proximity to any given location using the Haversine formula.

---

## 🔗 Live API

**Base URL:** `https://school-management-api-bwbb.onrender.com`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/addSchool` | POST | Add a new school |
| `/listSchools` | GET | List schools sorted by distance |

> ⚠️ Hosted on Render free tier — first request may take 30–50 seconds to wake up.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js ≥ 18 |
| Framework | Express.js 4 |
| Database | PostgreSQL (Render) |
| Driver | pg (node-postgres) |
| Hosting | Render |

---

## 📁 Project Structure

```
school-management-api/
├── db/
│   └── schema.sql                # PostgreSQL table DDL
├── postman/
│   └── School_Management_API.postman_collection.json
├── src/
│   ├── app.js                    # Express app & middleware
│   ├── server.js                 # HTTP server entry point
│   ├── config/
│   │   └── db.js                 # PostgreSQL connection pool
│   ├── controllers/
│   │   └── schoolController.js   # Request handlers + validation
│   ├── models/
│   │   └── schoolModel.js        # DB queries
│   ├── routes/
│   │   └── schoolRoutes.js       # Route definitions
│   └── utils/
│       └── distance.js           # Haversine distance formula
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/abeersaxena2006/schoolmanagement.git
cd schoolmanagement

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Fill in your PostgreSQL DATABASE_URL in .env

# 4. Run the schema
psql $DATABASE_URL < db/schema.sql

# 5. Start the server
npm run dev       # development (auto-reload)
npm start         # production
```

Server runs on **http://localhost:3000**

---

## 📌 API Reference

### POST `/addSchool`

Adds a new school to the database.

**Request Body (JSON):**

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| name | string | ✅ | Non-empty |
| address | string | ✅ | Non-empty |
| latitude | number | ✅ | −90 to 90 |
| longitude | number | ✅ | −180 to 180 |

**Example Request:**
```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5494,
  "longitude": 77.2667
}
```

**201 Created:**
```json
{
  "success": true,
  "message": "School added successfully.",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Mathura Road, New Delhi",
    "latitude": 28.5494,
    "longitude": 77.2667
  }
}
```

**400 Bad Request:**
```json
{
  "success": false,
  "errors": [
    "name must be a non-empty string.",
    "latitude must be between -90 and 90."
  ]
}
```

---

### GET `/listSchools`

Returns all schools sorted by distance from the user's location.

**Query Parameters:**

| Param | Type | Required | Constraints |
|-------|------|----------|-------------|
| latitude | number | ✅ | −90 to 90 |
| longitude | number | ✅ | −180 to 180 |

**Example Request:**
```
GET /listSchools?latitude=28.6139&longitude=77.2090
```

**200 OK:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 2,
      "name": "Modern School",
      "address": "Barakhamba Road, New Delhi",
      "latitude": 28.6314,
      "longitude": 77.2204,
      "distance_km": 2.3451
    },
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Mathura Road, New Delhi",
      "latitude": 28.5494,
      "longitude": 77.2667,
      "distance_km": 9.8713
    }
  ]
}
```

---

## 📐 Distance Algorithm

Schools are sorted using the **Haversine formula** — calculates great-circle distance between two coordinates accounting for Earth's curvature.

```
a = sin²(Δlat/2) + cos(lat1) · cos(lat2) · sin²(Δlon/2)
d = 2R · atan2(√a, √(1−a))      R = 6371 km
```

Each school in the response includes a `distance_km` field (4 decimal places).

---

## 🌍 Deployment (Render)

1. Push code to GitHub
2. Create a **PostgreSQL** database on Render
3. Create a **Web Service** on Render, connect the GitHub repo
4. Set environment variables:
   ```
   DATABASE_URL=<your render postgres internal url>
   NODE_ENV=production
   ```
5. Run `db/schema.sql` once via pgAdmin or psql
6. Deploy — Render auto-builds on every push

---

## 📬 Postman Collection

Import `postman/School_Management_API.postman_collection.json` into Postman.

Includes:
- ✅ Health Check
- ✅ Add School — Success
- ✅ Add School — Validation Error
- ✅ List Schools — Sorted by Distance
- ✅ List Schools — Missing Params

Set the `baseUrl` variable to `https://school-management-api-bwbb.onrender.com` for live testing.

---

## 👤 Author

**Abeer Saxena**  
B.Tech CSE, VIT Bhopal University  
[LinkedIn](https://linkedin.com/in/abeer-saxena-0720bb309) • abeer.24bce10987@vitbhopal.ac.in
