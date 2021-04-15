const express = require('express');
require('dotenv').config();
const { dbConfig } = require('./config/database.conf');
const { userRoutes } = require('./routes/user.routes');
const {User} = require('./models/User');

const app = express();

app.use('/api/user', userRoutes);

dbConfig.sync().then(resp => {
    console.log('DB On');
}).catch(err => {
    throw err
});

app.listen(process.env.PORT, () => {
    console.log('Server ON', process.env.PORT);
});