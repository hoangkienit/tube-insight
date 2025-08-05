import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import rateLimit from 'express-rate-limit';

// Import routes
import YoutubeRoute from './routes/youtube.route';

import errorHandler from './middlewares/error.middleware';
import http from "http";
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT as string;

app.use(express.json());
app.use('/thumbnails', express.static(path.join(__dirname, 'thumbnails')));
app.use('/audios', express.static(path.join(__dirname, 'audios')));


//===========CORS===========
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

//===========MIDDLEWARES===========
app.use(express.urlencoded({ extended: true }));
// app.use(requestLogger);


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per minute
});

app.use('/api/v1/youtube', limiter);

// Routes
app.get('/', (req, res) => {
    res.send('Hello from TypeScript backend!');
});

app.use('/api/v1/youtube', YoutubeRoute);

// Error handling
app.use(errorHandler);

//===========GLOBAL HANDLERS FOR UNEXPECTED ERRORS===========
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});