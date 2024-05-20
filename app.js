import express, { json, urlencoded, static as static_ } from 'express';
import path, { join } from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors'
import indexRouter from './routes/index.js';
import { configDotenv } from 'dotenv';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import { FirestoreStore } from '@google-cloud/connect-firestore';
import fire from './config/firestore.js';
configDotenv()

const app = express();
const __dirname = path.resolve();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    limit: 100,
    handler: (req, res) => {
        res.status(429).json({
            message: "Too many requests, please try again later.",
        });
    }
})

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(limiter)
app.use(cors({
    credentials: true,
    origin: `http://${process.env.FRONT_END_DOMAIN}`
}))
app.use(session({
    store: new FirestoreStore({
        dataset: fire,
        kind: 'express-sessions'
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false,
        path: '/',
    }
}))
app.use(static_(join(__dirname, 'public')));

app.use('/app', indexRouter);
app.use((req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }
})

export default app;
