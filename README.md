# LLM-Analyzer

Full-stack web application that lets you paste any text, then summarizes it and classifies its sentiment (Positive / Neutral / Negative) with a **local** Large-Language-Model through **Ollama**.  Analyses are stored in a JSON file so they persist between restarts.

## Demo

| Role | Username | Password | Capabilities |
|------|----------|----------|--------------|
| Writer | `writer` | `writer` | add new text, run analysis, view table |
| Reader | `reader` | `reader` | view table only |

![screenshot](docs/screenshot.png)

---
## 1. Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | ≥ 18 | global `fetch` API required |
| **npm** | ≥ 9 | ships with Node |
| **Ollama** | 0.1.7+ | `brew install ollama` (mac) or see <https://ollama.ai> |
| **Git** | optional | for cloning/pushing |

> **Model** – any that supports summarization; examples: `llama3`, `mistral`, …

---
## 2. Clone & Install

```bash
# clone your fork or download the zip
git clone https://github.com/nityakollu/LLM-Analyzer.git
cd LLM-Analyzer
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---
## 3. Run the stack (3 terminals)

### Terminal 1 – Ollama

```bash
ollama pull llama3     # first time only
ollama serve           # stays running on http://localhost:11434
```

### Terminal 2 – Backend (Express)

```bash
cd backend
npm run dev            # http://localhost:3000/api/health
```

### Terminal 3 – Frontend (Angular)

```bash
cd frontend
npx ng serve           # http://localhost:4200/
```

Open <http://localhost:4200/login> and log in with the credentials above.

---
## 4. File Structure (condensed)

```
backend/
  app.js                 Express entry-point
  data/                  analyses & users JSON "database"
  routes/                auth and analyses endpoints
  utils/ollama.js        helper that calls Ollama
frontend/
  src/app/               Angular standalone components & services
  src/styles.scss        Global styling
```

---
## 5. Environment Variables (optional)

| Variable | Default | Description |
|----------|---------|-------------|
| `OLLAMA_BASE` | `http://localhost:11434` | change if Ollama runs elsewhere |
| `OLLAMA_MODEL` | `llama3` | default model name |
| `JWT_SECRET` | hard-coded fallback | override for production |

Create a `.env` file in `backend/` to set these.

---
## 6. Customizing

* **Change model** – pull another model with `ollama pull MODEL` and set `OLLAMA_MODEL`.
* **New users** – run `node backend/make-hash.js <password>` and add to `data/users.json`.
* **Styling** – edit `frontend/src/styles.scss` (CSS variables at top).

---
## 7. Production build (optional)

```bash
# front-end build
cd frontend
npm run build          # output in frontend/dist/

# run backend with process manager (pm2, docker, …)
```

---
## 8. License

MIT.  Feel free to improve & PR.
