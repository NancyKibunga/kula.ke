import express from  'express';
import cors from 'cors';
import foodRouter from './routers/food.router.js';

// create the express app and call it
const app = express();

// using the cors package that receives requests from localhost 3000 only
app.use(cors
    ({
        credentials:true,
        origin: ['https://localhost:3000'],
    })
    );
// the address for the foodrouter
    app.use('/api/foods', foodRouter);


//backend address
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log('listening on port' +PORT);
    });