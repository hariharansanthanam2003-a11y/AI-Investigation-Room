# AI Mystery Room

An interactive fictional detective game built with React, Express, MongoDB, and Gemini. The production build serves the Vite frontend from Express, so the browser and API share one origin and session cookies work without cross-origin configuration.

## Deploy to Render

This repository includes a `render.yaml` Blueprint. You will need a GitHub copy of this repository, a MongoDB Atlas database, and a Gemini API key if you want AI case generation. The sample mystery can be used without Gemini.

1. **Create the MongoDB database.** In [MongoDB Atlas](https://www.mongodb.com/atlas), create a free cluster and database user. In Network Access, allow connections from Render (for a quick start you can allow `0.0.0.0/0`; use a narrower IP rule if your hosting plan provides stable outbound IPs). Copy the driver's connection string, replace the password placeholder, and include the database name `ai_mystery_room`.
2. **Push this project to GitHub.** Make sure `server/.env` and `client/.env` are not committed. They are ignored by `.gitignore`; use the example files for local setup.
3. **Create the Render service.** In Render, choose **New > Blueprint**, connect the repository, and apply `render.yaml`. It builds the client, starts the Express server, and checks `/api/v1/health`.
4. **Set the service secrets.** In the Render service environment, set `MONGODB_URI` to the Atlas connection string and `GEMINI_API_KEY` to your key. Render generates `SESSION_SECRET` from the Blueprint. Keep `NODE_ENV=production` and `GEMINI_MODEL=gemini-2.5-flash` as configured.
5. **Deploy and open the service URL.** Wait for the deploy to finish and for the health check to pass. Open the `onrender.com` URL. The API is served under `/api/v1`; the UI uses that same origin automatically.
6. **Check the live app.** Visit `<your-service-url>/api/v1/health`. A healthy database reports `"database":"ready"`. Open the home page, create a case, then refresh and confirm it remains available in that browser session.

The Blueprint creates one web service. MongoDB Atlas stores both game cases and browser sessions, so a service restart does not discard a player's session. Do not use an ephemeral local disk for this data. If you later host the frontend separately, set `CLIENT_ORIGIN` on the API to the exact frontend origin and set `VITE_API_BASE_URL` at frontend build time to `https://<api-host>/api/v1`.

## Run locally

Requirements: Node.js 20 or newer, npm, MongoDB (local or Atlas), and optionally a Gemini API key.

1. Run `npm install` in the repository root, then `npm install --prefix server` and `npm install --prefix client`.
2. Copy `server/.env.example` to `server/.env`; set `MONGODB_URI`, a long random `SESSION_SECRET`, and optionally `GEMINI_API_KEY`.
3. Copy `client/.env.example` to `client/.env` only if you need to override the same-origin API path.
4. Run `npm run dev`. Vite listens on port 5173 and proxies `/api` to Express on port 5000.

## Commands

- `npm run dev` — run the frontend and API for development
- `npm run build` — build the frontend into `client/dist`
- `npm start` — start the production Express server (build the frontend first)
- `npm test` — run the backend and frontend test suites

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes in production | Atlas or MongoDB connection string; stores cases and sessions |
| `SESSION_SECRET` | Yes in production | Signs the browser session cookie; use a long random value |
| `GEMINI_API_KEY` | Optional | Enables new AI-generated cases; sample gameplay works without it |
| `GEMINI_MODEL` | No | Gemini model; defaults to `gemini-2.5-flash` |
| `PORT` | Set by Render | HTTP port; defaults to `5000` locally |
| `CLIENT_ORIGIN` | Only for separate frontend hosting | Exact allowed frontend origin; defaults to `http://localhost:5173` |
| `VITE_API_BASE_URL` | Only for separate frontend hosting | API base URL baked into the client build; defaults to `/api/v1` |

Never commit real `.env` files or expose `GEMINI_API_KEY` or `SESSION_SECRET` in frontend variables. MongoDB and Gemini failures prevent persisted/AI case features; the API health endpoint reports database availability.
