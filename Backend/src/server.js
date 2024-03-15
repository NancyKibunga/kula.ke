// configure .env to ensure the database uri is not exposed 
import dotenv from 'dotenv';
dotenv.config(); 

import express from  'express';
import cors from 'cors';
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';

// calling the dbconnect function 
import { dbconnect } from './Config/database.config.js';
dbconnect();


// create the express app and call it
const app = express();
// letting express use json to respond to request body data
app.use(express.json());
// using the cors package that receives requests from localhost 3000 only
app.use(
    cors
    ({
        credentials:true,
        origin: ['http://localhost:3000'],
    })
    );
    
// the address for the foodrouter
    app.use('/api/foods', foodRouter);
// login router address
    app.use('/api/users', userRouter);
// orders router address
    app.use('/api/orders', orderRouter);


//backend address
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log('listening on port' +PORT);
    });