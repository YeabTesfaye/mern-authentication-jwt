import express from 'express';
import dotev from 'dotenv';
import { UserRouter } from './route/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
dotev.config();
connectDB();
const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(cookieParser());
app.use('/api/users', UserRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
})