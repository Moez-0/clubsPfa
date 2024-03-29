import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import clubRoutes from './routes/club.route.js';
import adminRoutes from './routes/admin.route.js';
import clubCreationRoutes from './routes/clubCreation.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
}
);

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    }
);


app.use(express.json());

app.use("/api/user", userRoutes);;
app.use("/api/auth", authRoutes);
app.use("/api/club", clubRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/clubCreation", clubCreationRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });

});

    
