import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import { handleRegister } from './controllers/register.js';
import { handleSignin} from './controllers/signin.js';
import { handleProfileGet } from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js'; 
// import dotenv from 'dotenv';
import knex from 'knex';

// dotenv.config({ path: './.env' });
const PORT = process.env.DB_PORT || 3000;

const db = knex({
    client: process.env.DB_CLIENT,
    connection: {
      connectionString: process.env.DB_URL,
      ssl : { rejectUnauthorized: false},
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
});

const app = express();
 
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send('success');
});

app.post('/signin', (req,res) => {
    handleSignin(req,res,db,bcrypt);
});

app.post('/register',(req,res) => {
    handleRegister(req,res,db,bcrypt);
});

app.get('/profile/:id',(req,res) => {
    handleProfileGet(req,res,db);
});

app.put('/image', (req,res) => {
    handleImage(req,res,db); 
});

app.post('/imageurl', (req,res) => {
    handleApiCall(req,res);
});

app.listen(PORT ,() => {
    console.log(`app is running on port ${PORT}`);
});