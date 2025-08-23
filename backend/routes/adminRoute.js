import express from 'express' 
import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

adminRouter.post('/login', loginAdmin);
adminRouter.post('/add-doctor', authAdmin ,upload.single('image') ,addDoctor); 
adminRouter.get('/all-doctors', authAdmin, allDoctors);   
adminRouter.patch('/change-availability', authAdmin, changeAvailability);      
adminRouter.get('/all-appointments', authAdmin, appointmentsAdmin);   
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);      
adminRouter.get('/dashboard', authAdmin, adminDashboard);  


export default adminRouter  