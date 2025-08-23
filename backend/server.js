import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config 
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares 
app.use(express.json())

// CORS configuration for production
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:5176',
        'http://localhost:5177',
        'https://*.vercel.app',
        /https:\/\/.*\.vercel\.app$/,
        // Production URLs
        'https://doctor-healthcare-app-admin.vercel.app',
        'https://doctor-healthcare-app-frontend-d9h2.vercel.app'
    ],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// api endpoints 
app.use('/api/admin', adminRouter);
// localhost:4000/api/admin/add-doctor 
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('API WORKING Fine')
})

app.listen(port, () => console.log("Server Started", port)); 