import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handlesignin from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import handleImage from './controllers/image.js';
import handleDetectFaces from './controllers/detectFaces.js';
    
const db = knex({
    client: 'pg',
    connection: {
      host : DB_CONNECTION_HOST,
      port : 5432,
      user : 'postgres',
      password : DB_CONNECTION_PASSWORD,
      database : 'postgres'
    }
});
  
// db.select('*').from('users').then(data => console.log(data)) //we don't need to use json because we are not using http here

const app = express();


app.listen(3000, () => "SERVER LISTENING ON PORT 3000")

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json("SUCCESS");
})

app.post('/signin', ( req, res ) => handlesignin(req, res, db, bcrypt))


app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));


app.get('/profile/:id', (req, res) => handleProfile(req, res, db))


app.put('/image', (req, res) => handleImage(req, res, db))

app.post('/detectFaces', (req, res ) => handleDetectFaces(req, res))


