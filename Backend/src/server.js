import express from  'express';
import cors from 'cors';
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';


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
// lpgin router address
    app.use('/api/users', userRouter);

//backend address
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log('listening on port' +PORT);
    });