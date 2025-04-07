import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.route';
import adminRoutes from './routes/admin.route';
import userRoutes from './routes/user.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);     // Register & Login
app.use('/admin', adminRoutes);   // Admin - Add/Update/Delete grocery items
app.use('/user', userRoutes);     // User - View items, Place order

// Health check
app.get('/', (_req, res) => {
  res.send('🚀 Grocery Booking API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
