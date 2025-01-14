const express = require('express');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

app.use(express.json());

app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});