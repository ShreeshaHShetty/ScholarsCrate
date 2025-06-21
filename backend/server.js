// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const studentRoutes = require('./routes/student');
const providerRoutes = require('./routes/provider'); // ✅ add this
const adminRoutes = require('./routes/admin');
const scholarshipRoutes = require('./routes/scholarships');




// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/student', studentRoutes);
app.use('/api/provider', providerRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/scholarships', scholarshipRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const Scholarship = require('./models/Scholarship');

async function deleteExpiredScholarships() {
  const now = new Date();
  await Scholarship.deleteMany({ deadline: { $lt: now } });
  console.log("Expired scholarships removed.");
}

// Every day at midnight (if using cron-job or just call it before fetching)
setInterval(deleteExpiredScholarships, 24 * 60 * 60 * 1000);
deleteExpiredScholarships(); // Optional: call once at server startup
