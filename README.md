# 🎥 Tube Insight (TypeScript)

**Tube Insight** is a modern, full-stack web application that provides powerful insights into YouTube video data. Built with **Node.js**, **Express**, and modern frontend frameworks (ReactJS)

---

## 🚀 Features

- 🔍 Analyze YouTube videos by URL
- 📊 Extract and display key video metrics:
  - Title, channel name
  - Video duration
- 🧠 Sentence-level analysis and AI probability (for captions/subtitles)
- 💨 Fast and rate-limited backend API using Express
- 🔐 Environment-configured with `.env` for secret keys
- ⚙️ Ready for deployment (Docker, Vercel, etc.)

---

## 🛠️ Tech Stack

| Layer        | Technology                   |
|--------------|------------------------------|
| Backend      | Node.js, Express.js          |
| API          | Sapling API, AssemblyAI      |
| Middleware   | CORS, dotenv, rate-limit     |
| Frontend     | [Planned: React/Next.js]     |
| Dev Tools    | nodemon, ESLint              |
| Deployment   | Docker, VPS (frontend: nginx, backend)|

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/hoangkienit/tube-insight.git
cd tube-insight
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the root and add:

```env
PORT=5000
ASSEMBLYAI_API_KEY=your_assembly_api_key
SAPLING_API_KEY=your_sapling_api_key
```

### 4. Start the server

```bash
npm run dev
```

Backend will be running at: `http://localhost:5000`

---

## 📄 API Endpoints

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| POST   | `/api/v1/youtube/analyze` | Analyze sentence-level data with words timestamps    |

---

## 🚧 Roadmap

- [x] Backend API for YouTube metadata
- [x] Subtitle/sentence analysis
- [ ] Frontend UI with React
- [ ] Auth integration (optional)
- [ ] Store history / user sessions
- [ ] Deploy to production

---

## 📁 Project Structure

```
tube-insight/
├── routes/
│   └── youtube.route.ts     # Main API routes
├── controllers/
│   └── youtube.controller.ts# API logic
├── services/
│   └── youtube.service.ts# API logic
├── middlewares/
│   └── error.middleware.ts  # Error handling
├── utils/
├── .env
├── index.ts                 # Entry point
└── package.json
```

---

## 🛡️ Security

- All API keys are managed via environment variables
- CORS and rate-limiting enabled for protection

---

## 🙋‍♂️ Contributing

Pull requests are welcome! If you find any bugs or want to contribute a feature, please fork the repo and submit a PR.

---

## ✨ Author

**Hoàng Kiện**  
- GitHub: [@hoangkienit](https://github.com/hoangkienit)
