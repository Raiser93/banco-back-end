const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser')
const { dbConfig } = require('./config/database.conf');

// Importar Rutas
const { userRoutes } = require('./routes/user.routes');
const { authRoutes } = require('./routes/auth.routes');
const { bankAccountRoutes } = require('./routes/bank-account.routes');

// Importar modelos de tablas
const { User } = require('./models/User');
const { BankAccount } = require('./models/BankAccount');
const { BankAccountThird } = require('./models/BankAccountThird');

// Crear Servidor Express
const app = express();

// Base de datos
dbConfig.sync().then(resp => {
    console.log('DB On');
}).catch(err => {
    throw err
});

// Public
app.use(express.static('public'));

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Rutas
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bank', bankAccountRoutes);
// app.use('/api/bank', userRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server ON', process.env.PORT);
});