import express from 'express';
import mongoose from 'mongoose';
import { PORT, mogoDBURL } from './config.js';
import booksRoute from './Routes/booksRoute.js'
import cors from 'cors'

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
// Option 1: Allow all Origins with default of cors(*)
app.use(cors());
// Option 2: Allow custom Origins
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    }
));

app.use('/books', booksRoute);

mongoose
.connect(mogoDBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });