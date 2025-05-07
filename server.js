const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize App
const app = express();

// ✅ Load environment variables
dotenv.config();

// ✅ Middleware - JSON Parser
app.use(express.json());

// ✅ CORS Setup - Only once and before routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('SDMS Backend is running!');
});

// ✅ Import Routes
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Make sure this file exists

// ✅ Use Routes
app.use('/auth', authRoutes);
app.use('/api/student', studentRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
