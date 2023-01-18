import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

import dotenv from 'dotenv';

const app = express();
dotenv.config();


//set up bodyparser to properly send requests
app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);


app.get('/', (req, res) => {
    res.send('hello to overwatch API');
});

//connect server to database using mongodb
//   https://www.mongodb.com/atlas/database


const PORT = process.env.PORT || 5000;

//use mongoose to connect to database using the CONNECTION URL
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    //if connection is successful
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    
    //if connection is not successful
    .catch((error) => console.log(error.message)); 

